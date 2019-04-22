const createAccount = `INSERT INTO accounts(accountNumber, owner, type, balance)
VALUES($1, $2, $3, $4)
RETURNING id, accountNumber, owner, type, status, balance, createdOn`;

const accountDetails = 'SELECT * FROM accounts WHERE accountNumber= $1 limit 1';

const updateAccountStatus = 'UPDATE accounts SET status = $1 WHERE accountNumber = $2';

const deleteAccount = 'DELETE from accounts where accountNumber = $1';

const getAccountNumber = `select A.createdon, A.accountnumber, U.email, A.type, A.status, A.balance
                          from accounts A 
                          inner join users U on A.owner = U.id where A.accountnumber = $1`;

const getAccountWithEmail = `select A.createdon, A.accountnumber, A.type, 
                            A.status, A.balance, U.email 
                            from accounts A inner join users U on A.owner = U.id where U.email = $1`;

const allAccountsByStatus = `select A.createdon, A.accountnumber, A.type, A.status, 
                             A.balance, U.email from accounts A inner join users U on A.owner = U.id 
                             where A.status = $1`;

const allaccounts = `select A.createdon, A.accountnumber, A.type, A.status, 
                     A.balance, U.email from accounts A inner join users U on A.owner = U.id`;


export {
  createAccount,
  accountDetails,
  updateAccountStatus,
  deleteAccount,
  getAccountNumber,
  getAccountWithEmail,
  allAccountsByStatus,
  allaccounts,
};
