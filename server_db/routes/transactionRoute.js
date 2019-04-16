import express from 'express';
import Role from '../middlewares/authorization';
import auth from '../middlewares/authentication';
import validateAmount from '../middlewares/validateTransaction';
import validateAccountNumber from '../middlewares/validateAccountNumber';
import transactionController from '../controllers/transactionController';

const router = express.Router();

router.post('/transactions/:accountNumber/credit', auth, validateAccountNumber, validateAmount,
 Role.isStaff, transactionController.creditUser);

export default router;
