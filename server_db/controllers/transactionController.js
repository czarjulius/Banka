import Transaction from '../models/transactionQuery';
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
  static async creditUser(req, res) {
    req.body.accountnumber = req.params.accountNumber;
    req.body.cashier = req.authUser.id;

    const transaction = await Transaction.credit(res, req.body);
    return res.status(200).json({
      status: 200,
      data: transaction.rows,
    });
  }
}

export default TransactionController;
