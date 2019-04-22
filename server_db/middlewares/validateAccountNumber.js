/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */

/**
   * @description Run a check on the account number
   * @param {integer} req
   * @param {object} res
   * @method validateAccountNumber
   */
const validateAccountNumber = (req, res, next) => {
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
  next();
};

export default validateAccountNumber;
