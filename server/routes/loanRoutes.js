import express from 'express';

import { loanApply } from '../controllers/loanController';
import { verifyToken, verifyUser } from '../middlewares/verifyAuth';

const router = express.Router();

// users Routes

router.post('/loans', verifyUser, loanApply);
export default router;
