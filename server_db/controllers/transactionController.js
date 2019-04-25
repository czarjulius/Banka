/* eslint-disable no-trailing-spaces */
import EmailController from './emailController';
import Transaction from '../models/transactionQuery';
import { accountDetails, emailParams } from '../models/accountQuery';
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
      
      if (transaction) {
        const emailQuery = await db.query(emailParams, [req.params.accountNumber]);
        EmailController.sendEmail(emailQuery.rows[0]);
      }
      
      return res.status(200).json({
        status: 200,
        message: 'Account credited successfully',
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

      if (rows[0].status === 'dormant') {
        return res.status(400).json({
          status: 404,
          error: 'Sorry this account is dormant. Kindly visit the costumer services for account reactivation',
        });
      }

      const transaction = await Transaction.debit(res, req.body);
      if (transaction) {
        const emailQuery = await db.query(emailParams, [req.params.accountNumber]);
        EmailController.sendEmail(emailQuery.rows[0]);
      }
      return res.status(200).json({
        status: 200,
        message: 'Account debited successfully',
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
      const { accountNumber } = req.params;
      
      const result = await Transaction.specificAccountTransactions(accountNumber);
      
      if (!result.rows.length > 0) {
        return res.status(404).json({
          status: 404,
          error: 'No Transaction created on this account yet',
        });
      }
      const { id, type } = req.authUser;

      if (type === 'user') {
        if (result.rows[0].owner !== id) {
          return res.status(400).json({
            status: 400,
            error: 'You cannot access someone\'s account details',
          });
        }
      }

      return res.status(200).json({
        status: 200,
        message: 'Transaction details fetched successfully',
        data: result.rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  /**
   * @description Get a particular transaction details by passing the transaction Id
   * @static
   * @param {integer} req - request
   * @param {object} res - response
   * @method getTransactionById
   */
  static async getTransactionById(req, res) {
    try {
      
      const result = await Transaction.selectTransactionById(req.params.id);


      if (!result) {
        return res.status(404).json({
          status: 400,
          error: `Transaction with ID ${req.params.id} is not found`,
        });
      }
      
      const { id, type } = req.authUser;

      if (type === 'user') {
        if (result.owner !== id) {
          return res.status(400).json({
            status: 400,
            error: 'You cannot access someone\'s account details',
          });
        }
      }
      
      return res.status(200).json({
        status: 200,
        message: 'Transaction details fetched successfully',
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
