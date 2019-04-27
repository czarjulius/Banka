import express from 'express';
import userRoute from './userRoute';
import accountRoute from './accountRoute';
import transactionRoute from './transactionRoute';
import adminRoute from './adminRoute';

const router = express.Router();

router.use('/api/v1', userRoute);
router.use('/api/v1', accountRoute);
router.use('/api/v1', transactionRoute);
router.use('/api/v1', adminRoute);

export default router;
