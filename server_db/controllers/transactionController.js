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
    req.body.accountnumber = req.params.accountNumber;
    req.body.cashier = req.authUser.id;

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
  }

  /**
   * @description Debit an Account
   * @static
  * @param {integer} - Number of the Bank Account
  * @return {object} - The account that has the specified number with balance increased
   * @method creditUser
   */
  static async debitUser(req, res) {
    req.body.accountnumber = req.params.accountNumber;
    req.body.cashier = req.authUser.id;

    const { rows } = await db.query(accountDetails, [req.params.accountNumber]);

    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Account not found',
      });
    }

    const transaction = await Transaction.debit(res, req.body);
    return res.status(200).json({
      status: transaction.rows[0].newbalance < req.body.amount ? 400 : 200,
      data: transaction.rows[0].newbalance < req.body.amount ? 'insufficent fund' : transaction.rows,
    });
  }
}

export default TransactionController;
