/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
class ValidateTranType {
  static validateTran(request, response, next) {
    const { type } = request.body;
    if (!type) {
      return response.status(400).json({
        status: 400,
        error: 'Type is required',
      });
    }
    if (!type.match(/[^\s-]/)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }

    if (!isNaN(type)) {
      return response.status(400).json({
        status: 400,
        error: 'Transaction type must be letters',
      });
    }
    if (!(type.toLowerCase() === 'credit' || type.toLowerCase() === 'debit')) {
      return response.status(400).json({
        status: 400,
        error: 'Transaction type must be credit or debit',
      });
    }
    
    next();
  }
}

export default ValidateTranType;
