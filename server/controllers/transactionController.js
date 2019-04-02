import accountModel from '../models/account';
import transactionModel from '../models/transaction';

class TransactionController {
  static creditUser(req, res) {
    const { accountNumber } = req.params;
    const { amount, transactionType } = req.body;

    const currentAccount = accountModel.find(account => account.accountNumber === accountNumber);
    if (currentAccount) {
      const currentTransaction = {
        transactionId: transactionModel[transactionModel.length - 1].transactionId + 1,
        accountNumber,
        amount,
        cashier: req.authUser.id,
        transactionType,
        accountBalance: (currentAccount.balance += parseFloat(amount, 10)).toFixed(2),
      };
      accountModel.balance += amount;
      transactionModel.push(currentTransaction);
      return res.status(200).json({
        status: '200',
        data: {
          ...currentTransaction,
        },
      });
    }
    return res.status(404).json({
      status: '404',
      error: 'Account not found',
    });
  }

  static debitUser(req, res) {
    const { accountNumber } = req.params;
    const { amount, transactionType } = req.body;

    const currentAccount = accountModel.find(account => account.accountNumber === accountNumber);
    if (currentAccount) {
      if (amount > currentAccount.balance) {
        return res.status(400).json({
          status: '400',
          error: 'Insufficient Account Balance',
        });
      }
      const currentTransaction = {
        transactionId: transactionModel[transactionModel.length - 1].transactionId + 1,
        accountNumber,
        amount,
        cashier: req.authUser.id,
        transactionType,
        accountBalance: (currentAccount.balance -= parseFloat(amount, 10)).toFixed(2),
      };
      accountModel.balance -= amount;
      transactionModel.push(currentTransaction);
      return res.status(200).json({
        status: '200',
        data: {
          ...currentTransaction,
        },
      });
    }
    return res.status(404).json({
      status: '404',
      error: 'Account not found',
    });
  }
}

export default TransactionController;
