import express from 'express';
import accountController from '../controllers/accountController';
import auth from '../middlewares/authentication';
import validateAccountNumber from '../middlewares/validateAccountNumber';
import role from '../middlewares/authorization';
import { validateAccount, validateStatus } from '../middlewares/validateAccount';

const router = express.Router();

router.post('/accounts', auth, validateAccount, accountController.postAccount);
router.patch('/account/:accountNumber', auth, validateStatus, validateAccountNumber, role.admin, accountController.updateAccount);
router.delete('/accounts/:accountNumber', auth, validateAccountNumber, role.admin, accountController.deleteAccount);
router.get('/accounts', auth, role.admin, accountController.getAllAccounts);

export default router;
