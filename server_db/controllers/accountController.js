/* eslint-disable consistent-return */
import createAccount from '../models/accountQuery';
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
      const accountNumber = Math.random().toString().slice(2, 12);

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
}

export default AccountController;
