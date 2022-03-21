import LocalStrategy from 'passport-local';
import UserService from '../../../services/users.service';
import bcrypt from 'bcrypt';

export default new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (username: string, password: string, done) => {
    try {
      const userService = new UserService();
      const user = await userService.findByEmail(username);
      const match = await bcrypt.compare(password, user.password as string);
      if (match) {
        return done(null, user);
      }
      done(null, false);
    } catch (error) {
      done(error);
    }
  }
);
