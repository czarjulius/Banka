import accountModel from '../models/account';
import userModel from '../models/user';
class AccountController {
  static postAccount(req, res) {
    const { type } = req.body;
    const { id } = req.userData;
    const account = {
      id: accountModel.length + 1,
      accountNumber: Math.random().toString().slice(2, 12),
      createdOn: new Date(),
      owner: id,
      type,
      status: 'active',
      balance: parseFloat(0, 10).toFixed(2),
    };

    accountModel.push(account);
    res.status(201).json({
      status: '201',
      data: {
        ...account,
        user: userModel.find(user => user.id === id),
      },
    });
  }
}

export default AccountController;
