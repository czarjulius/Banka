import express from 'express';
import accountController from '../controllers/accountController';
import auth from '../middlewares/authentication';
import validateAccount from '../middlewares/validateAccount';
import validateAccountNumber from '../middlewares/validateAccountNumber';
import role from '../middlewares/authorization';

const router = express.Router();

router.post('/accounts', auth, validateAccount, accountController.postAccount);
router.patch('/account/:accountNumber', auth, validateAccountNumber, role.adminStaff, accountController.updateAccount);
router.delete('/accounts/:accountNumber', auth, validateAccountNumber, role.adminStaff, accountController.deleteAccount);

export default router;
