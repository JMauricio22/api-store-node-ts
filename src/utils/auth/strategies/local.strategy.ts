import LocalStrategy from 'passport-local';
import AuthService from '../../../services/auth.service';

const service = new AuthService();

export default new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (username: string, password: string, done) => {
    try {
      const user = await service.getUserByEmail(username, password);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
