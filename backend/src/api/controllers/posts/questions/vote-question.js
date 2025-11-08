import { Question, User, Votes } from '../../../../models/index.js';
import { errorHelper, logger, getText} from '../../../../utils/index.js';
import { validateVoteQuestionValidator } from '../../../validators/question.validator.js';
import { decodeAccessToken } from '../../../../utils/helpers/jwt-token-helper.js';

export default async (req, res) => {
  const { error } = validateVoteQuestionValidator(req.body);

  if (error) {
    let code = '00100';
    if (error.details[0].message.includes('questionId'))
      code = '00104';
    else if (error.details[0].message.includes('voteType'))
      code = '00103';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }

  const decoded = decodeAccessToken(req.headers.authorization);

  const { questionId, voteType } = req.body;

  const question = await Question.findById(questionId).catch((err) => {
    return res.status(500).json(errorHelper('00031', req, err.message));
  });

  if (!question) {
    return res.status(404).json(errorHelper('00106', req, getText('en', '00106')));
  }

  const user = await User.findById(decoded._id).catch((err) => {
    return res.status(500).json(errorHelper('00031', req, err.message));
  });

  if (!user) {
    return res.status(404).json(errorHelper('00015', req, getText('en', '00015')));
  }

  const alreadyUpvoted = await Votes.findOne({ questionId, voteBy: decoded._id, voteType: 'upvote' });
  const alreadyDownvoted = await Votes.findOne({ questionId, voteBy: decoded._id, voteType: 'downvote' });

  if (voteType === 'upvote') {
    if (alreadyUpvoted) {
      await Votes.deleteOne({ questionId, voteBy: decoded._id, voteType: 'upvote' });
    } else {
      await Votes.create({ questionId, voteBy: decoded._id, voteType: 'upvote' });
      console.log('Created upvote');
      if (alreadyDownvoted) {
        await Votes.deleteOne({ questionId, voteBy: decoded._id, voteType: 'downvote' });
      }
    }
  } else if (voteType === 'downvote') {
    if (alreadyDownvoted) {
      await Votes.deleteOne({ questionId, voteBy: decoded._id, voteType: 'downvote' });
    } else {
      await Votes.create({ questionId, voteBy: decoded._id, voteType: 'downvote' });
      console.log('Created downvote');
      if (alreadyUpvoted) {
        await Votes.deleteOne({ questionId, voteBy: decoded._id, voteType: 'upvote' });
      }
    }
  }

  const upvotesCount = await Votes.countDocuments({ questionId, voteType: 'upvote' });
  const downvotesCount = await Votes.countDocuments({ questionId, voteType: 'downvote' });
  question.votes = upvotesCount - downvotesCount;
  await question.save().catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText('en', '00142'), tr: getText('tr', '00142') },
    resultCode: '00142',
    question,
  });
};
