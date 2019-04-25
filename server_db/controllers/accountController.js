/* eslint-disable no-trailing-spaces */
/* eslint-disable consistent-return */
import {
  createAccount, accountDetails,
  updateAccountStatus, deleteAccount, 
  getAccountNumber, getAccountWithEmail,
  allAccountsByStatus, allaccounts,
} from '../models/accountQuery';
import { userDetails } from '../models/userQuery';

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
      const { type } = req.body;
      const amount = 0.00;
      const {
        id: userId, firstname, lastname, email,
      } = req.authUser;
      const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);

      const values = [accountNumber, userId, type, amount];
      const result = await db.query(createAccount, values);
      return res.status(201).json({
        status: 201,
        message: 'Account successfully created',
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
        message: 'Status updated successfully',
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

      res.status(203).json({
        status: 203,
        message: 'Account has been deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * @description Get account detail by account number
   * @static
   * @param {integer} req - request
   * @param {object} res - response
   * @method getByAccountNumber
   */
  static async getByAccountNumber(req, res) {
    try {
      const { accountNumber } = req.params;

      const result = await db.query(getAccountNumber, [accountNumber]);

      const { id, type } = req.authUser;

      if (type === 'user') {
        if (result.rows[0].id !== id) {
          return res.status(400).json({
            status: 400,
            error: 'You cannot access someone\'s account details',
          });
        }
      }

      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'Account fetched successfully',
        data: result.rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  /**
   * @description Get all accounts owned by this specific user
   * @static
   * @param {string} req - request
   * @param {array} res - response
   * @method getAccountByEmail
   */
  static async getAccountByEmail(req, res) {
    try {
      const { email } = req.params;
      
      const userEmail = await db.query(userDetails, [email]);

      const { id, type } = req.authUser;
      
      if (!userEmail.rows.length) {
        return res.status(400).json({
          status: 400,
          error: `There is no user with ${email}`,
        });
      }
      const result = await db.query(getAccountWithEmail, [email]);
        
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 400,
          error: 'This user is yet to create an account',
        });
      }

      if (type === 'user') {
        if (userEmail.rows[0].id !== id) {
          return res.status(400).json({
            status: 400,
            error: 'You cannot access someone\'s account details',
          });
        }
      }
      return res.status(200).json({
        message: 'Accounts fetched successfully',
        status: 200,
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
   * @description Get all accounts created
   * @static
   * @param {array} res - response
   * @method getAllAccounts
   */
  static async getAllAccounts(req, res) {
    try {
      const { status } = req.query;
      
      if (status && !(status.toLowerCase() === 'active' || status.toLowerCase() === 'dormant')) {
        console.log(status);
        return res.status(404).json({
          status: 404,
          error: 'Status must be active or dormant',
        });
      }
      // when status is passed 
      if (status && (status.toLowerCase() === 'active' || status.toLowerCase() === 'dormant')) {
        const result = await db.query(allAccountsByStatus, [status.toLowerCase()]);
  
        if (result.rowCount < 1) {
          return res.status(404).json({
            status: 400,
            error: 'No result to display yet',
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'All accounts successfully fetched',
          data: result.rows,
        });
      }

      // when getting all accounts
      const result = await db.query(allaccounts);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'no account created yet',
        });
      }
      return res.status(200).json({
        status: 200,
        data: result.rows,
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
