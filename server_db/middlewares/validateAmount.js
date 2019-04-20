/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
class ValidateAmount {
  static validateAmt(request, response, next) {
    const { amount } = request.body;

    if (!amount) {
      return response.status(400).json({
        status: 400,
        error: 'Amount is required',
      });
    }
    if (isNaN(amount)) {
      return response.status(400).json({
        status: 400,
        error: 'Amount must be a number',
      });
    }
    next();
  }
}

export default ValidateAmount;
