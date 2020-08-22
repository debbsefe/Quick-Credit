import express from 'express';

import { loanApply, getAllLoans, retrieveOneLoan, adminApproveLoan } from '../controllers/loanController';
import { verifyToken, verifyUser } from '../middlewares/verifyAuth';

const router = express.Router();

// loan Routes

router.post('/', verifyUser, loanApply);
router.get('/', verifyToken, getAllLoans);
router.get('/:id', verifyToken, retrieveOneLoan);
router.patch('/:id', verifyToken, adminApproveLoan);



export default router;
