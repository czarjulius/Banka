import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../models/db';
import generateToken from '../middlewares/generateToken';
import { staffSignup, userDetails } from '../models/adminQuery';

dotenv.config();
/**
 * @description Defines the actions for User endpoints
 * @class AccountController
 */
class Admin {
  /**
   * @description Creates a new admin record
   * @static
   * @param {object} req - The form data to be inputted
   * @param {object} res - The status code and data including login token..
   * @method postUser
   */
  static async staffSignup(req, res) {
    try {
      const {
        firstName, lastName, email, phoneNumber,
      } = req.body;

      const userEmail = await db.query(userDetails, [email]);
      if (userEmail.rows.length) {
        return res.status(409).json({
          status: 409,
          error: 'Email is already registered',
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const values = [firstName, lastName, email, hashedPassword, phoneNumber, 'staff', true];
      const result = await db.query(staffSignup, values);
      const token = generateToken(result.rows[0].id, result.rows[0].email, result.rows[0].isadmin, result.rows[0].type);
      return res.header('x-access-token', token).status(201).json({
        status: 201,
        message: 'Admin Registration successful',
        data: {
          token,
          id: result.rows[0].id,
          firstName: result.rows[0].firstname,
          lastName: result.rows[0].lastname,
          email,
          phoneNumber: result.rows[0].phonenumber,
          type: result.rows[0].type,
          isAdmin: result.rows[0].isadmin,
          registeredOn: result.rows[0].registeredon,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }
}

export default Admin;
