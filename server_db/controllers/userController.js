import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../models/db';
import generateToken from '../middlewares/generateToken';
import userSignup from '../models/userQuery';

dotenv.config();
class User {
  static async userSignup(req, res) {
    try {
      const {
        firstName, lastName, email, phoneNumber,
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const values = [firstName, lastName, email, hashedPassword, phoneNumber];
      const result = await db.query(userSignup, values);
      const token = generateToken(result.rows[0].id, result.rows[0].email, result.rows[0].isadmin, result.rows[0].type);
      return res.header('x-access-token', token).status(201).json({
        status: 201,
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

export default User;
