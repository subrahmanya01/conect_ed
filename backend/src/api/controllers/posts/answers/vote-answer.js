import { Answer, Question, User, Votes } from '../../../../models/index.js';
import { errorHelper, logger, getText} from '../../../../utils/index.js';
import { validateVoteAnswerRequest } from '../../../validators/answer.validator.js';
import { decodeAccessToken } from '../../../../utils/helpers/jwt-token-helper.js';

export default async (req, res) => {
  const { error } = validateVoteAnswerRequest(req.body);

  if (error) {
    let code = '00100';
    if (error.details[0].message.includes('answerId'))
      code = '00104';
    else if (error.details[0].message.includes('voteType'))
      code = '00103';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }
  
  const decoded = decodeAccessToken(req.headers.authorization);

  const { answerId, voteType } = req.body;

  const answer = await Answer.findById(answerId).catch((err) => {
    return res.status(500).json(errorHelper('00031', req, err.message));
  });

  if (!answer) {
    return res.status(404).json(errorHelper('00107', req, getText('en', '00107')));
  }

  const user = await User.findById(decoded._id).catch((err) => {
    return res.status(500).json(errorHelper('00031', req, err.message));
  });

  if (!user) {
    return res.status(404).json(errorHelper('00015', req, getText('en', '00015')));
  }

  const alreadyUpvoted = await Votes.findOne({ answerId, voteBy: decoded._id, voteType: 'upvote' });
  const alreadyDownvoted = await Votes.findOne({ answerId, voteBy: decoded._id, voteType: 'downvote' });

  if (voteType === 'upvote') {
    if (alreadyUpvoted) {
      await Votes.deleteOne({ answerId, voteBy: decoded._id, voteType: 'upvote' });
    } else {
      await Votes.create({ answerId, voteBy: decoded._id, voteType: 'upvote' });
      if (alreadyDownvoted) {
        await Votes.deleteOne({ answerId, voteBy: decoded._id, voteType: 'downvote' });
      }
    }
  } else if (voteType === 'downvote') {
    if (alreadyDownvoted) {
      await Votes.deleteOne({ answerId, voteBy: decoded._id, voteType: 'downvote' });
    } else {
      await Votes.create({ answerId, voteBy: decoded._id, voteType: 'downvote' });
      if (alreadyUpvoted) {
        await Votes.deleteOne({ answerId, voteBy: decoded._id, voteType: 'upvote' });
      }
    }
  }

  await answer.save().catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message));
  });

  const upvotesCount = await Votes.countDocuments({ answerId, voteType: 'upvote' });
  const downvotesCount = await Votes.countDocuments({ answerId, voteType: 'downvote' });
  answer.votes = upvotesCount - downvotesCount;
  await answer.save();

  return res.status(200).json({
    resultMessage: { en: getText('en', '00110'), tr: getText('tr', '00110') },
    resultCode: '00110',
    answer,
  });
};