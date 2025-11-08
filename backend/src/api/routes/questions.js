import { Router } from 'express';
import { addQuestion, deleteQuestion, editQuestion, getQuestionById, getQuestionByUserId, getQuestions, getQuestionsByPage, updateQuestionViews, voteQuestion } from '../controllers/posts/index.js';
import { auth } from '../middlewares/index.js';

const router = Router();

// Question
router.post('/add', addQuestion);
router.patch('/edit', editQuestion);
router.delete('/delete/:id', deleteQuestion);
router.get('/', auth, getQuestions);
router.get('/:userId', getQuestionByUserId);
router.get('/page/:page/:pageSize', getQuestionsByPage);
router.get('/get/:questionId', getQuestionById);
router.post('/vote', voteQuestion);
router.post('/update-views', updateQuestionViews);

export default router