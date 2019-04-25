import express from 'express';
import authenticate from '../middlewares/authentication';
import transactionController from '../controllers/transactionController';
import Validate from '../middlewares/Validate';

const router = express.Router();

router.post('/transactions/:accountNumber/credit', authenticate, Validate.validateAccountNumber,
  Validate.validateAmount, Validate.isStaff, transactionController.creditUser);

router.post('/transactions/:accountNumber/debit', authenticate, Validate.validateAccountNumber,
  Validate.validateAmount, Validate.isStaff, transactionController.debitUser);

router.get('/accounts/:accountNumber/transactions', authenticate, Validate.validateAccountNumber,
  transactionController.getSpecificAccountTransactions);

router.get('/transactions/:id', authenticate, Validate.validateId, transactionController.getTransactionById);

export default router;
