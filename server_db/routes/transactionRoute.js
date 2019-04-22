import express from 'express';
import Role from '../middlewares/authorization';
import auth from '../middlewares/authentication';
import ValidateAmount from '../middlewares/validateAmount';
import validateAccountNumber from '../middlewares/validateAccountNumber';
import transactionController from '../controllers/transactionController';
import ValidateId from '../middlewares/validateId';

const router = express.Router();

router.post('/transactions/:accountNumber/credit', auth, validateAccountNumber, ValidateAmount.validateAmt,
  Role.isStaff, transactionController.creditUser);

router.post('/transactions/:accountNumber/debit', auth, validateAccountNumber, ValidateAmount.validateAmt,
  Role.isStaff, transactionController.debitUser);

router.get('/accounts/:accountNumber/transactions', transactionController.getSpecificAccountTransactions);

router.get('/transactions/:id', auth, ValidateId, transactionController.getTransactionById);

export default router;
