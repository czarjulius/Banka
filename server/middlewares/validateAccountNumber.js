/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
const validateAccountNumber = (req, res, next) => {
  const { accountNumber } = req.params;
  if (isNaN(accountNumber)) {
    return res.status(400).json({
      status: 400,
      error: 'Account Number must be a number ',
    });
  }
  if ((accountNumber % 1) !== 0) {
    return res.status(400).json({
      status: 400,
      error: 'Account Number must be a positive integer ',
    });
  } if (accountNumber.length !== 10) {
    return res.status(400).json({
      status: 400,
      error: 'Account Number must be a 10 digits ',
    });
  }
  next();
};

export default validateAccountNumber;
