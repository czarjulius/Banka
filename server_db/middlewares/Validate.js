/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */

/**
 * @description Defines the neccessary validations needed to pass through the routes
 * @class Validate
 */
class Validate {
  /* Check if email is valid */
  static validateEmail(req, res, next) {
    let email;
    if (req.body.email) {
      email = req.body.email;
    } else {
      email = req.params.email;
    }
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      return res.status(400).json({
        status: 400,
        error: 'email is required',
      });
    }
    if (!email.match(/[^\s-]/)) {
      return res.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!email.match(pattern)) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a valid email',
      });
    }

    next();
  }

  static validateAccountNumber(req, res, next) {
    const { accountNumber } = req.params;
    
    if (accountNumber.toString().replace(/\s/g, '').length === 0) {
      return res.status(400).json({
        status: 400,
        error: 'Account Number must not empty or white-space',
      });
    }

    /* Check if account is a number */
    if (isNaN(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Account Number must be a number',
      });
    }

    /* Check if account is a whole number */
    if ((accountNumber % 1) !== 0) {
      return res.status(400).json({
        status: 400,
        error: 'Account Number must be a whole integer',
      });
    }

    if (accountNumber.length !== 10) {
      return res.status(400).json({
        status: 400,
        error: 'Account Number must be 10 digits',
      });
    }
    next();
  }

  static validateId(req, res, next) {
    const { id } = req.params;
    if (id.toString().replace(/\s/g, '').length === 0) {
      return res.status(400).json({
        status: 400,
        error: 'ID must not empty or white-space ',
      });
    }

    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        error: 'ID must be a number',
      });
    }

    if ((id % 1) !== 0) {
      return res.status(400).json({
        status: 400,
        error: 'ID must be a positive integer ',
      });
    }
    next();
  }

  /* Validate transaction type */
  static validateTransactionType(req, res, next) {
    const { type } = req.body;
    if (!type.match(/[^\s-]/)) {
      return res.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }

    if (!isNaN(type)) {
      return res.status(400).json({
        status: 400,
        error: 'Transaction type must be letters',
      });
    }
    if (!(type.toLowerCase() === 'credit' || type.toLowerCase() === 'debit')) {
      return res.status(400).json({
        status: 400,
        error: 'Transaction type must be credit or debit',
      });
    }

    next();
  }

  static validateAccountStatus(req, res, next) {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        status: 400,
        error: 'Status is required',
      });
    }
    if (!status.match(/[^\s-]/)) {
      return res.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }

    if (!isNaN(status)) {
      return res.status(400).json({
        status: 400,
        error: 'Transaction type must be letters',
      });
    }
    if (!(status.toLowerCase() === 'active' || status.toLowerCase() === 'dormant')) {
      return res.status(400).json({
        status: 400,
        error: 'Account status must be active or dormant',
      });
    }

    next();
  }

  static validateAccountType(req, res, next) {
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({
        status: 400,
        error: 'Type is required',
      });
    }

    if (!type.match(/[^\s-]/)) {
      return res.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }

    if (!isNaN(type)) {
      return res.status(400).json({
        status: 400,
        error: 'Transaction type must be letters',
      });
    }
    if (!(type.toLowerCase() === 'savings' || type.toLowerCase() === 'current')) {
      return res.status(400).json({
        status: 400,
        error: 'Account type must be savings or current',
      });
    }
    next();
  }

  static validateAmount(req, res, next) {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        status: 400,
        error: 'Amount is required',
      });
    }
    if (isNaN(amount)) {
      return res.status(400).json({
        status: 400,
        error: 'Amount must be a number',
      });
    }
    next();
  }

  /* When only admin has the right to carryout the function */
  static admin(req, res, next) {
    const { isadmin } = req.authUser;   
    if (!isadmin) {
      return res.status(403).json({
        status: 403,
        error: 'Access denied! You are not an Admin',
      });
    }
    next();
  }

  /* When only staff has the right to carryout the function */
  static isStaff(req, res, next) {
    const { type, isadmin } = req.authUser;

    if (type !== 'staff' || isadmin === true) {
      return res.status(403).json({
        status: 403,
        error: 'Access denied! You are not a Staff',
      });
    }
    next();
  }

  static validateSignup(req, res, next) {
    const {
      firstName, lastName, password, phoneNumber,
    } = req.body;
    if (!firstName) {
      return res.status(400).json({
        status: 400,
        error: 'firstname is required',
      });
    }
    if (!firstName.match(/[^\s-]/)) {
      return res.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!isNaN(firstName)) {
      return res.status(400).json({
        status: 400,
        error: 'Firstname must be letters',
      });
    }
    if (firstName.length < 2) {
      return res.status(400).json({
        status: 400,
        error: 'first Name must be atleast 3 alphabets',
      });
    }
    if (!lastName) {
      return res.status(400).json({
        status: 400,
        error: 'lastname is required',
      });
    }
    if (!lastName.match(/[^\s-]/)) {
      return res.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!isNaN(lastName)) {
      return res.status(400).json({
        status: 400,
        error: 'Lastname must be letters',
      });
    }
    if (lastName.length < 2) {
      return res.status(400).json({
        status: 400,
        error: 'last Name must be atleast 3 alphabets',
      });
    }
    if (!password) {
      return res.status(400).json({
        status: 400,
        error: 'password is required',
      });
    }

    if (!phoneNumber) {
      return res.status(400).json({
        status: 400,
        error: 'phoneNumber is required',
      });
    }

    if (phoneNumber.toString().replace(/\s/g, '').length === 0) {
      return res.status(400).json({
        status: 400,
        error: 'Phone Number must not empty or white-space ',
      });
    }

    /* Check if phhone is a number */
    if (isNaN(phoneNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Phone Number must be a number ',
      });
    }

    /* Check if phone is a whole number */
    if ((phoneNumber % 1) !== 0) {
      return res.status(400).json({
        status: 400,
        error: 'Phone Number must be a positive integer ',
      });
    }
    next();
  }

  static validatePassword(req, res, next) {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({
        status: 400,
        error: 'password is required to login',
      });
    }
    next();
  }
}

export default Validate;
