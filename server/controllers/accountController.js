/* eslint-disable consistent-return */
import Account from '../models/account';
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
  static postAccount(req, res) {
    try {
      const { type, amount, passportUrl } = req.body;
      const {
        id: userId, firstName, lastName, email,
      } = req.authUser;
      const newAccountData = {
        id: Account.length + 1,
        accountNumber: Math.random().toString().slice(2, 12),
        createdOn: new Date(),
        owner: userId,
        type,
        passportUrl,
        status: 'active',
        balance: parseFloat(amount, 10).toFixed(2),
      };

      Account.push(newAccountData);
      const { accountNumber } = Account[Account.length - 1];
      res.status(201).json({
        status: 201,
        data: {
          id: Account.length + 1,
          accountNumber,
          firstName,
          lastName,
          email,
          type,
          passportUrl,
          openingBalance: parseFloat(amount, 10).toFixed(2),
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
  * @description Patch an Account
  * @param {integer} - Number of the Account
  * @return {object} - The account that has the specified number with new status
  */
  static updateAccount(req, res) {
    try {
      const { accountNumber } = req.params;
      const { status } = req.body;

      const currentAccount = Account
        .find(account => account.accountNumber === accountNumber);

      if (currentAccount) {
        currentAccount.status = status;
        return res.status(200).json({
          status: 200,
          data: {
            accountNumber,
            status: Account
              .find(account => account.accountNumber === currentAccount.accountNumber)
              .status,
          },
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Account not found',
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
  * @description Delete an Account
  * @param {integer} - Number of the Account
  * @return {object} - The satus code and message to show delete action completed
  */
  static deleteAccount(req, res) {
    try {
      const { accountNumber } = req.params;
      const currentAccount = Account
        .find(account => account.accountNumber === accountNumber);

      if (!currentAccount) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }

      const index = Account.indexOf(currentAccount);
      Account.splice(index, 1);
      return res.status(203).json({
        status: 203,
        message: 'Account successfully deleted',
      });
    } catch (err) {
      console.log(err);
    }
  }

  static getAllAccounts(req, res) {
    try {
      if (Account.length < 1) {
        return res.status(400).json({
          status: 400,
          error: 'No Account created yet',
        });
      }
      res.status(200).json({
        status: 200,
        data: Account,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default AccountController;
