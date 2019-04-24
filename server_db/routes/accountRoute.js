import express from 'express';
import accountController from '../controllers/accountController';
import authenticate from '../middlewares/authentication';
import Validate from '../middlewares/Validate';

const router = express.Router();

router.post('/accounts', authenticate, Validate.validateAccountType, Validate.validateAmount, accountController.postAccount);

router.patch('/account/:accountNumber', authenticate, Validate.admin, Validate.validateAccountNumber, Validate.validateAccountStatus,
  accountController.editAccountStatus);

router.delete('/accounts/:accountNumber', authenticate, Validate.admin, Validate.validateAccountNumber,
  accountController.deleteAccount);

router.get('/accounts/:accountNumber', authenticate, Validate.validateAccountNumber, accountController.getByAccountNumber);

router.get('/user/:email/accounts', authenticate, Validate.validateEmail, accountController.getAccountByEmail);

router.get('/accounts', authenticate, Validate.admin, accountController.getAllAccounts);

export default router;
