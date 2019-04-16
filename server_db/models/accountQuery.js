const createAccount = `INSERT INTO accounts(accountNumber, owner, type, balance)
VALUES($1, $2, $3, $4)
RETURNING id, accountNumber, owner, type, status, balance, createdOn`;

export default createAccount;
