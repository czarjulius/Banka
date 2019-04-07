import express from 'express';
import UserController from '../controllers/userController';
import validateSignup from '../middlewares/validateUser';

const router = express.Router();

router.post('/auth/signup', validateSignup, UserController.postUser);

export default router;
