/* eslint-disable consistent-return */
class Role {
  static admin(req, res, next) {
    if (req.userData.isAdmin === false) {
      return res.status(403).json({
        status: 403,
        error: 'Access denied! You are not an Admin',
      });
    }
    next();
  }

  static isStaff(req, res, next) {
    if (req.userData.type !== 'staff') {
      return res.status(403).json({
        status: 403,
        error: 'Access denied! You are not a Staff',
      });
    }
    next();
  }

  static adminStaff(req, res, next) {
    if (req.userData.isAdmin === false) {
      return res.status(403).json({
        status: 403,
        error: 'Access denied! You are not an Admin or a Staff',
      });
    }
    next();
  }
}

export default Role;
