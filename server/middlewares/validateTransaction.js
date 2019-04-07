/* eslint-disable consistent-return */
import { check, validationResult } from 'express-validator/check';

const validateAmount = [
  check('amount')
    .not().isEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a number')
    .matches(/^\S{3,}$/)
    .withMessage('Account Number cannot contain whitespaces')
    .trim(),

  check('transactionType')
    .not().isEmpty()
    .withMessage('Transaction type is required')
    .matches(/^[a-zA-Z]+$/i)
    .withMessage('Transaction type must contain only alphabets')
    .matches(/^\S{3,}$/)
    .withMessage('Transaction type cannot contain whitespaces')
    .isIn(['debit', 'credit', 'DEBIT', 'CREDIT', 'Debit', 'Credit'])
    .withMessage('only debit or credit transaction types are allowed')
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

export default validateAmount;
