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
      status: 201,
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

  static login(req, res) {
    const {
      email, password,
    } = req.body;

    const currentUser = userModel.find(user => user.email === email && user.password === password);
    if (currentUser) {
      const token = generateToken(currentUser.id, currentUser.email, currentUser.isAdmin, currentUser.type);
      return res.header('x-access-token', token).status(200).json({
        status: 200,
        data: {
          token,
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          phoneNumber: currentUser.phoneNumber,
          type: currentUser.type,
          isAdmin: currentUser.isAdmin,
        },
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Username or Password is Incorrect',
    });
  }
}

export default UserController;
