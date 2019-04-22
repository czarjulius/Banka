/* eslint-disable no-restricted-globals */
// eslint-disable-next-line consistent-return
const validateId = (req, res, next) => {
  const { id } = req.params;
  if (id.toString().replace(/\s/g, '').length === 0) {
    return res.status(400).json({
      status: 400,
      error: 'Account Number must not empty or white-space ',
    });
  }

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      error: 'Account Number must be a number ',
    });
  }

  if ((id % 1) !== 0) {
    return res.status(400).json({
      status: 400,
      error: 'Account Number must be a positive integer ',
    });
  }
  next();
};

export default validateId;
