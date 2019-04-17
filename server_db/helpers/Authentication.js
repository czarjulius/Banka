import db from '../models/db';

/**
 * @description getting user data through the id
 * @class AuthenticationHelper
 */
class AuthenticationHelper {
  /**
   * @description get a user records
   * @static
   * @param {integer} req - request
   * @param {array} res - response
   * @method getAuthUser
   */
  static async getAuthUser(id) {
    const query = `SELECT 
        id, 
        firstname, 
        lastname, 
        email, isAdmin, 
        registeredOn, 
        type 
        FROM users WHERE id = $1`;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

export default AuthenticationHelper;
