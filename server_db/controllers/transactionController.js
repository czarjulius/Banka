/* eslint-disable no-trailing-spaces */
import Transaction from '../models/transactionQuery';
import { accountDetails } from '../models/accountQuery';
import db from '../models/db';

/**
 * @description Defines the actions for Transaction endpoints
 * @class TransactionController
 */
class TransactionController {
  /**
   * @description Credit an Account
   * @static
  * @param {integer} - Number of the Bank Account
  * @return {object} - The account that has the specified number with balance increased
   * @method creditUser
   */
  static async creditUser(req, res) {
    try {
      req.body.accountnumber = req.params.accountNumber;
      req.body.cashier = req.authUser.id;
      req.body.type = 'credit';

      const { rows } = await db.query(accountDetails, [req.params.accountNumber]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }

      const transaction = await Transaction.credit(res, req.body);

      return res.status(200).json({
        status: 200,
        data: transaction.rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  /**
   * @description Debit an Account
   * @static
  * @param {integer} - Number of the Bank Account
  * @return {object} - The account that has the specified number with balance increased
   * @method creditUser
   */
  static async debitUser(req, res) {
    try {
      req.body.accountnumber = req.params.accountNumber;
      req.body.cashier = req.authUser.id;
      req.body.type = 'debit';

      const { rows } = await db.query(accountDetails, [req.params.accountNumber]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }

      const transaction = await Transaction.debit(res, req.body);
      return res.status(200).json({
        status: 200,
        data: transaction.rows,
      });
    } catch (err) {
      return err.message;
    }
  }
  /**
   * @description Get all transactions under a specific account number
   * @static
  * @param {integer} - Number of the Bank Account
  * @return {Array} - The transactions that was carried under specified account number
   * @method getSpecificAccountTransactions
   */
  
  static async getSpecificAccountTransactions(req, res) {
    try {
      const result = await Transaction.specificAccountTransactions(req.params.accountNumber);
      
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'No Transaction created on this account yet',
        });
      }

      return res.status(200).json({
        status: 200,
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async getTransactionById(req, res) {
    try {
      const result = await Transaction.selectTransactionById(req.params.id);

      if (!result) {
        return res.status(404).json({
          status: 400,
          error: `Transaction with ID ${req.params.id} is not found`,
        });
      }
      return res.status(200).json({
        status: 200,
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }
}

export default TransactionController;
