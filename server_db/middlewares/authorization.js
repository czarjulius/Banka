/* eslint-disable consistent-return */
/**
 * @description Defines the right a particular user have
 * @class Role
 */
class Role {

    /* When only admin has the right to carryout the function */
  static admin(req, res, next) {
    if (req.authUser.isAdmin === false) {
      return res.status(403).json({
        status: 403,
        error: 'Access denied! You are not an Admin',
      });
    }
    next();
  }

    /* When only staff has the right to carryout the function */
  static isStaff(req, res, next) {
    if (req.authUser.type !== 'staff') {
      return res.status(403).json({
        status: 403,
        error: 'Access denied! You are not a Staff',
      });
    }
    next();
  }
}

export default Role;
