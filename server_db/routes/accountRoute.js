import express from 'express';
import accountController from '../controllers/accountController';
import auth from '../middlewares/authentication';
import role from '../middlewares/authorization';
import ValidateAccType from '../middlewares/validateBankAccount';
import validateAccountNumber from '../middlewares/validateAccountNumber';

const router = express.Router();

router.post('/accounts', auth, ValidateAccType.validateType, accountController.postAccount);

router.patch('/account/:accountNumber', auth, validateAccountNumber,
  role.admin, accountController.editAccountStatus);

router.delete('/accounts/:accountNumber', auth, validateAccountNumber,
  role.admin, accountController.deleteAccount);

export default router;
