import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import Config from '../../../config/config';

const options: StrategyOptions = {
  secretOrKey: Config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export default new Strategy(options, (payload, done) => {
  console.log(payload);
  done(null, payload);
});
