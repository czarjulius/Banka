import db from './db';
class Transact {
  static async credit(res, transactionDetails) {
    const {
      transactionType, accountnumber, cashier, amount,
    } = transactionDetails;
    try {
      const account = await db.query(
        `SELECT * FROM accounts WHERE accountnumber = ${accountnumber}`,
      );
      const oldbalance = account.rows[0].balance;
      const newbalance = parseFloat(oldbalance) + parseFloat(amount);

      await db.query(
        `UPDATE accounts SET balance = $1 WHERE accountnumber = ${accountnumber}`,
        [
          newbalance,
        ],
      );
      return db.query(
        `INSERT INTO
              transactions(type, accountnumber, cashier, amount, oldbalance, newbalance)
          VALUES
              ($1, $2, $3, $4, $5, $6)
          RETURNING *`,
        [
          transactionType,
          accountnumber,
          cashier,
          amount,
          oldbalance,
          newbalance,
        ],
      );
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
  }
}

export default Transact;
