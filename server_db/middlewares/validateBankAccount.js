/* eslint-disable consistent-return */
import { check, validationResult } from 'express-validator/check';

const validateAccount = [
  check('type')
    .not().isEmpty()
    .withMessage('Account type is required')
    .matches(/^[a-zA-Z]+$/i)
    .withMessage('Account type must contain only alphabets')
    .matches(/^\S{3,}$/)
    .withMessage('Account type cannot contain whitespaces')
    .isIn(['savings', 'current', 'SAVINGS', 'CURRENT'])
    .withMessage('only savings or current account types are allowed')
    .trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: errors.array().map(i => i.msg),
      });
    }
    next();
  },
];

export default validateAccount;
