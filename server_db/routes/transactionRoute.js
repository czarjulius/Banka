import express from 'express';
import Role from '../middlewares/authorization';
import auth from '../middlewares/authentication';
import validateAmount from '../middlewares/validateTransaction';
import validateAccountNumber from '../middlewares/validateAccountNumber';
import transactionController from '../controllers/transactionController';

const router = express.Router();

router.post('/transactions/:accountNumber/credit', auth, validateAccountNumber, validateAmount,
 Role.isStaff, transactionController.creditUser);

 router.post('/transactions/:accountNumber/debit', auth, validateAccountNumber, validateAmount,
  Role.isStaff, transactionController.debitUser);


export default router;
