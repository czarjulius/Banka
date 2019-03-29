import express from 'express';
import userRoute from './userRoute';
import accountRoute from './accountRoute';

const router = express.Router();

router.use('/api/v1', userRoute);
router.use('/api/v1', accountRoute);

export default router;
