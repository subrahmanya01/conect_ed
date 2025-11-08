import { Question } from '../../../../models/index.js';
import { errorHelper, logger, getText} from '../../../../utils/index.js';
import { validateUpdateQuestionViewRequest } from '../../../validators/question.validator.js';

export default async (req, res) => {
  const { error } = validateUpdateQuestionViewRequest(req.body);

  if (error) {
    let code = '00100';
    if (error.details[0].message.includes('questionId'))
      code = '00140';
    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }

  const { questionId } = req.body;

  const question = await Question.findById(questionId).catch((err) => {
    return res.status(500).json(errorHelper('00031', req, err.message));
  });

  if (!question) {
    return res.status(404).json(errorHelper('00106', req, getText('en', '00106')));
  }

  question.views = (question.views || 0) + 1;

  await question.save().catch((err) => {
    return res.status(500).json(errorHelper('00034', req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText('en', '00111'), tr: getText('tr', '00111') },
    resultCode: '00111',
    question,
  });
};
