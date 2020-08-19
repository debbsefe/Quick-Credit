import express from 'express';

import { loanApply, getAllLoans, retrieveOneLoan } from '../controllers/loanController';
import { verifyToken, verifyUser } from '../middlewares/verifyAuth';

const router = express.Router();

// loan Routes

router.post('/loans', verifyUser, loanApply);
router.get('/loans', verifyToken, getAllLoans);
router.get('/loans/:id', verifyToken, retrieveOneLoan);


export default router;
