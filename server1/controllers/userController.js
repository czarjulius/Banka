/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import User from '../models/user';
import generateToken from '../middlewares/generateToken';

dotenv.config();

/**
 * @description Defines the actions for User endpoints
 * @class AccountController
 */
class UserController {
  /**
   * @description Creates a new user record
   * @static
   * @param {object} req - The form data to be inputted
   * @param {object} res - The status code and data including login token..
   * @method postUser
   */
  static postUser(req, res) {
    try {
      const {
        email, firstName, lastName, phoneNumber, password, type, isAdmin,
      } = req.body;
      const user = {
        id: User.length + 1,
        email,
        firstName,
        lastName,
        phoneNumber,
        password,
        type,
        isAdmin,
      };
      User.push(user);
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
    } catch (err) {
      console.log(err);
    }
  }

  /**
    * @description Login  a user
    * @method login
    * @params {object} req - The form data to be inputted
    * @return {object} res - The status code and data including login token.
    *
   */
  static login(req, res) {
    try {
      const {
        email, password,
      } = req.body;
      const currentUser = User.find(user => user.email === email && user.password === password);
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
    } catch (err) {
      console.log(err);
    }
  }
}

export default UserController;
