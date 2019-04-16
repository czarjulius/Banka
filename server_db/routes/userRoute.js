import express from 'express';
import UserController from '../controllers/userController';
import { validateSignup, validateLogin } from '../middlewares/validateUser';

const router = express.Router();

router.post('/auth/signup', validateSignup, UserController.userSignup);

export default router;
