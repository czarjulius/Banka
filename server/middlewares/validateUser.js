/* eslint-disable consistent-return */
import { check, validationResult } from 'express-validator/check';
import db from '../models/user';

const validateSignup = [
  check('firstName')
    .not().isEmpty()
    .withMessage('Firstname is required')
    .matches(/^[a-zA-Z]+$/i)
    .withMessage('firstname must contain only alphabets')
    .isLength({ min: 3 })
    .withMessage('firstname must have atleast 3 characters')
    .isLength({ max: 50 })
    .withMessage('firstname cannot have more than 15 characters')
    .matches(/^\S{3,}$/)
    .withMessage('firstname cannot contain whitespaces')
    .trim(),

  check('lastName')
    .not().isEmpty()
    .withMessage('lastName is required')
    .matches(/^[a-zA-Z]+$/i)
    .withMessage('lastname must contain only alphabets')
    .isLength({ min: 3 })
    .withMessage('lastname must have atleast 3 characters')
    .isLength({ max: 50 })
    .withMessage('lastname cannot have more than 15 characters')
    .matches(/^\S{3,}$/)
    .withMessage('lastname cannot contain whitespaces')
    .trim(),

  check('password')
    .not().isEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('password must have atleast 6 characters')
    .isLength({ max: 50 })
    .withMessage('password cannot contain more than 15 characters')
    .matches(/^\S{3,}$/)
    .withMessage('password cannot contain whitespaces')
    .trim(),

  check('phoneNumber')
    .not().isEmpty()
    .withMessage('Phone number is required')
    .isLength({ min: 10 })
    .withMessage('please input a valid phone number')
    .isLength({ max: 15 })
    .withMessage('please input a valid phone number')
    .isNumeric()
    .withMessage('phone number must contain only numbers')
    .trim(),

  check('type')
    .not().isEmpty()
    .withMessage('Type is required')
    .isIn(['staff', 'user', 'STAFF', 'USER'])
    .withMessage('only staff or user types are allowed')
    .trim(),

  check('isAdmin')
    .not().isEmpty()
    .withMessage('isAdmin is required')
    .isIn(['true', 'false', 'TRUE', 'FALSE'])
    .withMessage('only true or false are allowed')
    .trim(),

  check('email')
    .not().isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please input a valid email address')
    .custom(value => Promise.resolve(db.filter(user => user.email === value)).then((user) => {
      if (user.length) throw new Error('email has already been registered');
    })),
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

const validateLogin = [
  check('email')
    .not().isEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('please input a valid email address')
    .trim(),

  check('password')
    .not().isEmpty()
    .withMessage('password is required')
    .isLength({ min: 3 })
    .withMessage('please input a valid password')
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

export { validateSignup, validateLogin };
