import express from 'express';
import UserController from '../controllers/userController';
import { validateSignup, validateLogin } from '../middlewares/validateUser';

const router = express.Router();

router.post('/auth/signup', validateSignup, UserController.postUser);
router.post('/auth/signin', validateLogin, UserController.login);

export default router;
