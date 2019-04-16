import express from 'express';
import accountController from '../controllers/accountController';
import auth from '../middlewares/authentication';
import role from '../middlewares/authorization';
import validateAccount from '../middlewares/validateBankAccount';
import validateAccountNumber from '../middlewares/validateAccountNumber';

const router = express.Router();

router.post('/accounts', auth, validateAccount, accountController.postAccount);

export default router;
