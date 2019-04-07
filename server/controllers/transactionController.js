/* eslint-disable consistent-return */
import Account from '../models/account';
import Transaction from '../models/transaction';
/**
 * @description Defines the actions for Transaction endpoints
 * @class TransactionController
 */
class TransactionController {
  /**
   * @description Credit an Account
   * @static
  * @param {integer} - Number of the Account
  * @return {object} - The account that has the specified number with balance increased
   * @method creditUser
   */
  static creditUser(req, res) {
    try {
      const { accountNumber } = req.params;
      const { amount, transactionType } = req.body;

      const currentAccount = Account.find(account => account.accountNumber === accountNumber);
      if (currentAccount) {
        const currentTransaction = {
          transactionId: Transaction[Transaction.length - 1].transactionId + 1,
          accountNumber,
          amount,
          cashier: req.authUser.id,
          transactionType,
          accountBalance: (currentAccount.balance += parseFloat(amount, 10)).toFixed(2),
        };
        Account.balance += amount;
        Transaction.push(currentTransaction);
        return res.status(201).json({
          status: 201,
          data: {
            ...currentTransaction,
          },
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Account not found',
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
  * @description Debit an Account
  * @param {integer} - Number of the Account
  * @return {object} - The account that has the specified number with balance reduced
  */
  static debitUser(req, res) {
    try {
      const { accountNumber } = req.params;
      const { amount, transactionType } = req.body;

      const currentAccount = Account.find(account => account.accountNumber === accountNumber);
      if (currentAccount) {
        if (amount > currentAccount.balance) {
          return res.status(400).json({
            status: 400,
            error: 'Insufficient Account Balance',
          });
        }
        const currentTransaction = {
          transactionId: Transaction[Transaction.length - 1].transactionId + 1,
          accountNumber,
          amount,
          cashier: req.authUser.id,
          transactionType,
          accountBalance: (currentAccount.balance -= parseFloat(amount, 10)).toFixed(2),
        };
        Account.balance -= amount;
        Transaction.push(currentTransaction);
        return res.status(201).json({
          status: 201,
          data: {
            ...currentTransaction,
          },
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Account not found',
      });
    } catch (err) {
      console.log(err);
    }
  }

  static getAllTransactions(req, res) {
    try {
      if (Transaction.length < 1) {
        return res.status(400).json({
          status: 400,
          error: 'No Transaction created yet',
        });
      }
      res.status(200).json({
        status: 200,
        data: Transaction,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default TransactionController;
