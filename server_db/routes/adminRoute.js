import express from 'express';
import AdminController from '../controllers/adminController';
import Validate from '../middlewares/Validate';

const router = express.Router();

router.post('/newadmin', Validate.validateEmail, Validate.validateSignup, AdminController.staffSignup);

export default router;
