import { Router } from 'express';
import { addAnswer, deleteAnswer, editAnswer, getAnswerByQuestionId, getAnswerByUserId, voteAnswer,} from '../controllers/posts/index.js';

const router = Router();

// Answer
router.post('/add', addAnswer);
router.patch('/edit', editAnswer);
router.delete('/delete/:id', deleteAnswer);
router.get('/question/:questionId', getAnswerByQuestionId);
router.get('/:userId', getAnswerByUserId);
router.post('/vote', voteAnswer);


export default router