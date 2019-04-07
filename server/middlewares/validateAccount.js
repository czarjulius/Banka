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
    .isIn(['savings', 'current', 'SAVINGS', 'CURRENT', 'Savings', 'Current'])
    .withMessage('only savings or current account types are allowed')
    .trim(),

  check('passportUrl')
    .not().isEmpty()
    .withMessage('Passport is required')
    .trim(),

  check('amount')
    .not().isEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a number')
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

const validateStatus = [
  check('status')
    .not().isEmpty()
    .withMessage('Status is required')
    .matches(/^\S{3,}$/)
    .withMessage('Account type cannot contain whitespaces')
    .isIn(['active', 'dormant', 'ACTIVE', 'DORMANT', 'Active', 'Dormant'])
    .withMessage('only active or dormant  are allowed')
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

export { validateAccount, validateStatus };
