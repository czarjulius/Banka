import express from 'express';
import accountController from '../controllers/accountController';
import auth from '../middlewares/authentication';
import validateAccount from '../middlewares/validateAccount';
const router = express.Router();

router.post('/accounts', auth, validateAccount, accountController.postAccount);

export default router;
