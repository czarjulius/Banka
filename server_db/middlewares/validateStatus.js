/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
class ValidateAccStatus {
  static validateStatus(request, response, next) {
    const { status } = request.body;
    if (!status) {
      return response.status(400).json({
        status: 400,
        error: 'Status is required',
      });
    }
    if (!status.match(/[^\s-]/)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }

    if (!isNaN(status)) {
      return response.status(400).json({
        status: 400,
        error: 'Transaction type must be letters',
      });
    }
    if (!(status.toLowerCase() === 'active' || status.toLowerCase() === 'dormant')) {
      return response.status(400).json({
        status: 400,
        error: 'Account status must be active or dormant',
      });
    }

    next();
  }
}

export default ValidateAccStatus;
