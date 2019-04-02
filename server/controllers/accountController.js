import Account from '../models/account';

class AccountController {
  static postAccount(req, res) {
    const { type, amount } = req.body;
    const {
      id: userId, firstName, lastName, email,
    } = req.authUser;
    const newAccount = {
      id: Account.length + 1,
      accountNumber: Math.random().toString().slice(2, 12),
      createdOn: new Date(),
      owner: userId,
      type,
      status: 'active',
      balance: parseFloat(amount, 10).toFixed(2),
    };

    Account.push(newAccount);
    res.status(201).json({
      status: 201,
      data: {
        id: Account.length + 1,
        accountNumber: Math.random().toString().slice(2, 12),
        firstName,
        lastName,
        email,
        type,
        openingBalance: parseFloat(amount, 10).toFixed(2),
      },
    });
  }

  static updateAccount(req, res) {
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
    return res.status(404).json({
      status: 404,
      error: 'Account not found',
    });
  }

  static deleteAccount(req, res) {
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
  }
}

export default AccountController;
