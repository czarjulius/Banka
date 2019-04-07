import dotenv from 'dotenv';
import userModel from '../models/user';
import generateToken from '../middlewares/generateToken';

dotenv.config();


class UserController {
  static postUser(req, res) {
    const {
      email, firstName, lastName, phoneNumber, password, type, isAdmin,
    } = req.body;

    const user = {
      id: userModel.length + 1,
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
      type,
      isAdmin,
    };

    userModel.push(user);
    const token = generateToken(user.id, user.email, user.isAdmin, user.type);
    return res.header('x-access-token', token).status(201).json({
      status: '201',
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        type: user.type,
        isAdmin: user.isAdmin,
      },
    });
  }
}

export default UserController;
