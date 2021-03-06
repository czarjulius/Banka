const createAccount = `INSERT INTO accounts(accountNumber, owner, type, balance)
VALUES($1, $2, $3, $4)
RETURNING id, accountNumber, owner, type, status, balance, createdOn`;

const accountDetails = 'SELECT * FROM accounts WHERE accountNumber= $1 limit 1';

const updateAccountStatus = 'UPDATE accounts SET status = $1 WHERE accountNumber = $2';

const deleteAccount = 'DELETE from accounts where accountNumber = $1';

const getAccountNumber = `select A.createdon, A.accountnumber, U.email, U.id, A.type, A.status, A.balance
                          from accounts A 
                          inner join users U on A.owner = U.id where A.accountnumber = $1`;

const getAccountWithEmail = `select A.createdon, A.accountnumber, A.type, 
                            A.status, A.balance, U.email, U.id 
                            from accounts A inner join users U on A.owner = U.id where U.email = $1`;

const allAccountsByStatus = `select A.createdon, A.accountnumber, A.type, A.status, 
                             A.balance, U.email from accounts A inner join users U on A.owner = U.id 
                             where A.status = $1`;

const allaccounts = `select A.createdon, A.accountnumber, A.type, A.status, 
                     A.balance, U.email from accounts A inner join users U on A.owner = U.id`;

const emailParams = `select a.createdOn, a.accountNumber, u.firstname, t.amount, t.type, u.email,
                      a.balance from accounts as a inner join transactions t 
                      on a.accountnumber = t.accountnumber inner join users u 
                      on a.owner = u.id where a.accountnumber = $1`;

export {
  createAccount,
  accountDetails,
  updateAccountStatus,
  deleteAccount,
  getAccountNumber,
  getAccountWithEmail,
  allAccountsByStatus,
  allaccounts,
  emailParams,
};
