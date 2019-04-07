import express from 'express';
import TransactionController from '../controllers/transactionController';
import role from '../middlewares/authorization';
import auth from '../middlewares/authentication';
import validateAmount from '../middlewares/validateTransaction';
import validateAccountNumber from '../middlewares/validateAccountNumber';

const router = express.Router();

router.post('/transactions/:accountNumber/debit', auth, validateAccountNumber, validateAmount, role.isStaff, TransactionController.debitUser);

export default router;
