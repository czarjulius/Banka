/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
class ValidateAccType {
  static validateType(request, response, next) {
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
        error: 'Account type must be letters',
      });
    }
    // if ((type.toLowerCase() !== 'savings') || (type.toLowerCase() !== 'current')) {
    //   return response.status(400).json({
    //     status: 400,
    //     error: 'Account type must be savings or current',
    //   });
    // }
    next();
  }
}

export default ValidateAccType;
