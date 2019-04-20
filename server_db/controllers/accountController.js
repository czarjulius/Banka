/* eslint-disable no-trailing-spaces */
/* eslint-disable consistent-return */
import {
  createAccount, accountDetails,
  updateAccountStatus, deleteAccount, getAccountNumber,
} from '../models/accountQuery';

import db from '../models/db';
/**
 * @description Defines the actions for Account endpoints
 * @class AccountController
 */
class AccountController {
  /**
   * @description Creates new account record
   * @static
   * @param {object} req - request
   * @param {object} res - response
   * @method postAccount
   */
  static async postAccount(req, res) {
    try {
      const { type, amount } = req.body;
      const {
        id: userId, firstname, lastname, email,
      } = req.authUser;
      const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);

      const values = [accountNumber, userId, type, amount];
      const result = await db.query(createAccount, values);
      return res.status(201).json({
        status: 201,
        data: {
          id: result.rows[0].id,
          accountNumber: result.rows[0].accountnumber,
          firstname,
          lastname,
          email,
          type,
          openingBalace: parseFloat(amount, 10).toFixed(2),
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  /**
  * @description Patch an Account
  * @param {integer} - Number of the Account
  * @return {object} - The account that has the specified number with new status
  * @method editAccountStatus
  */
  static async editAccountStatus(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;
    const { rows } = await db.query(accountDetails, [accountNumber]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Account not found',
      });
    }

    await db.query(updateAccountStatus, [status, accountNumber]);
    const result = await db.query(accountDetails, [accountNumber]);
    try {
      res.status(200).json({
        status: 200,
        data: {
          accountNumber,
          state: result.rows[0].status,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  /**
  * @description Delete an Account
  * @param {integer} - Number of the Account
  * @return {object} - The satus code and message to show delete action completed
  */
  static async deleteAccount(req, res) {
    try {
      const { accountNumber } = req.params;
      let { rows } = await db.query(accountDetails, [accountNumber]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }
      rows = await db.query(deleteAccount, [accountNumber]);

      res.status(200).json({
        status: 200,
        message: 'Account has been deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  static async getByAccountNumber(req, res) {
    try {
      const { accountNumber } = req.params;

      const result = await db.query(getAccountNumber, [accountNumber]);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }

      return res.status(200).json({
        status: 200,
        data: result.rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }
}

export default AccountController;
