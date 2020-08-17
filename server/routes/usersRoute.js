import express from 'express';

import { createUser, siginUser, adminVerifyUser } from '../controllers/usersController';
import verifyToken from '../middlewares/verifyAuth';

const router = express.Router();

// users Routes

router.post('/auth/signup', createUser);
router.post('/auth/signin', siginUser);
router.patch('/:email/verify', verifyToken, adminVerifyUser);

export default router;
