import db from './db';
class Transact {
  static async credit(res, transactionDetails) {
    const {
      type, accountnumber, cashier, amount,
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
          type,
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

  static async debit(res, transactionDetails) {
    const {
      type, accountnumber, cashier, amount,
    } = transactionDetails;
    try {
      const account = await db.query(
        `SELECT * FROM accounts WHERE accountnumber = ${accountnumber}`,
      );
      const oldbalance = account.rows[0].balance;
      const newbalance = parseFloat(oldbalance) - parseFloat(amount);
      
      if (oldbalance < amount) {
        return res.status(400).json({
          status: 400,
          error: 'You have insufficent balance',
        });
      }

      await db.query(
        `UPDATE accounts SET balance = $1 WHERE accountnumber = ${accountnumber}`,
        [
          newbalance,
        ],
      );
      return await db.query(
        `INSERT INTO
              transactions(type, accountnumber, cashier, amount, oldbalance, newbalance)
          VALUES
              ($1, $2, $3, $4, $5, $6)
          RETURNING *`,
        [
          type,
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

  static async specificAccountTransactions(accountnumber) {
    const result = await db.query(
      `SELECT * FROM transactions WHERE accountnumber = ${accountnumber}`,
    );
  }

  static async selectTransactionById(id) {
    const result = await db.query(
      `Select id, createdon, type, accountnumber, amount, oldBalance, newBalance 
      from transactions where id = ${id} `,
    );
    return result.rows[0];
  }
}

export default Transact;
