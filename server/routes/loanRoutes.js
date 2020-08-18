import express from 'express';

import { loanApply, getAllLoans } from '../controllers/loanController';
import { verifyToken, verifyUser } from '../middlewares/verifyAuth';

const router = express.Router();

// users Routes

router.post('/loans', verifyUser, loanApply);
router.get('/loans', verifyToken, getAllLoans);

export default router;
