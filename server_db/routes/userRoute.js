import express from 'express';
import UserController from '../controllers/userController';
import ValidateUser from '../middlewares/validateUser';

const router = express.Router();

router.post('/auth/signup', ValidateUser.validateSignup, UserController.userSignup);
router.post('/auth/signin', ValidateUser.validateLogin, UserController.userLogin);

export default router;
