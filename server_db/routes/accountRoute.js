import express from 'express';
import accountController from '../controllers/accountController';
import auth from '../middlewares/authentication';
import role from '../middlewares/authorization';
import ValidateAccType from '../middlewares/validateBankAccount';
import validateAccountNumber from '../middlewares/validateAccountNumber';
import ValidateEmail from '../middlewares/validateEmail';
import ValidateStatus from '../middlewares/validateStatus';

const router = express.Router();

router.post('/accounts', auth, ValidateAccType.validateType, accountController.postAccount);

router.patch('/account/:accountNumber', auth, validateAccountNumber, ValidateStatus.validateStatus,
  role.admin, accountController.editAccountStatus);

router.delete('/accounts/:accountNumber', auth, validateAccountNumber,
  role.admin, accountController.deleteAccount);

router.get('/accounts/:accountNumber', auth, validateAccountNumber, accountController.getByAccountNumber);

router.get('/user/:email/accounts', auth, ValidateEmail, role.admin, accountController.getAccountByEmail);

router.get('/accounts', auth, role.admin, accountController.getAllAccounts);

export default router;
