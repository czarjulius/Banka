import db from '../models/user';

class AuthenticationHelper {
  static getAuthUser(id) {
    return db.find(user => user.id === id);
  }
}

export default AuthenticationHelper;
