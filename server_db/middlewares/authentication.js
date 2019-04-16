/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AuthenticationHelper from '../helpers/Authentication';

dotenv.config();

const auth = async (req, res, next) => {
  const token = req.header('x-access-token') || req.body.token;
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'access denied, no token provided',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await AuthenticationHelper.getAuthUser(decoded.id);
    req.authUser = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      error: 'authentication failed, please login again',
    });
  }
};

export default auth;
