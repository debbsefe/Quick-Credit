import express from 'express';
import loanRoutes from './loanRoutes';
import userRoutes from './usersRoute';

const router = express.Router();


router.use('/loans', loanRoutes)

router.use(
    '/auth', userRoutes
)

export default router;
