import express from 'express';
import AdminController from '../controllers/adminController';
import Validate from '../middlewares/Validate';
import authenticate from '../middlewares/authentication';

const router = express.Router();

router.post('/newadmin', authenticate, Validate.admin, Validate.validateEmail, Validate.validateSignup, AdminController.staffSignup);

router.get('/getallusers', authenticate, Validate.admin, AdminController.getAllUsers);

export default router;
