/* eslint-disable consistent-return */
const validateEmail = (req, res, next) => {
  const { email } = req.params;
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
};

export default validateEmail;
