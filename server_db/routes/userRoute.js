import express from 'express';
import UserController from '../controllers/userController';
import Validate from '../middlewares/Validate';

const router = express.Router();

router.post('/auth/signup', Validate.validateEmail, Validate.validateSignup, UserController.userSignup);
router.post('/auth/signin', Validate.validateEmail, Validate.validatePassword, UserController.userLogin);

export default router;
