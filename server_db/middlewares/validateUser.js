/* eslint-disable consistent-return */
class ValidateUser {
  static validateSignup(request, response, next) {
    const {
      firstName, lastName, email, password,
    } = request.body;
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!firstName) {
      return response.status(400).json({
        status: 400,
        error: 'firstname is required',
      });
    }
    if (!firstName.match(/[^\s-]/)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!isNaN(firstName)) {
      return response.status(400).json({
        status: 400,
        error: 'Firstname must be letters',
      });
    }
    if (firstName.length < 2) {
      return response.status(400).json({
        status: 400,
        error: 'first Name must be atleast 3 alphabets',
      });
    }
    if (!lastName) {
      return response.status(400).json({
        status: 400,
        error: 'lastname is required',
      });
    }
    if (!lastName.match(/[^\s-]/)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!isNaN(lastName)) {
      return response.status(400).json({
        status: 400,
        error: 'Lastname must be letters',
      });
    }
    if (lastName.length < 2) {
      return response.status(400).json({
        status: 400,
        error: 'last Name must be atleast 3 alphabets',
      });
    }
    if (!email) {
      return response.status(400).json({
        status: 400,
        error: 'email is required',
      });
    }
    if (!email.match(/[^\s-]/)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!email.match(pattern)) {
      return response.status(400).json({
        status: 400,
        error: 'Please provide a valid email',
      });
    }
    if (!password) {
      return response.status(400).json({
        status: 400,
        error: 'password is required',
      });
    }
    next();
  }

  static validateLogin(request, response, next) {
    const { email, password } = request.body;
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      return response.status(400).json({
        status: 400,
        error: 'email is required',
      });
    }
    if (!email.match(/[^\s-]/)) {
      return response.status(400).json({
        status: 400,
        error: 'Spaces are not allowed',
      });
    }
    if (!email.match(pattern)) {
      return response.status(400).json({
        status: 400,
        error: 'Please provide a valid email',
      });
    }
    if (!password) {
      return response.status(400).json({
        status: 400,
        error: 'password is required to login',
      });
    }
    next();
  }
}


export default ValidateUser;
