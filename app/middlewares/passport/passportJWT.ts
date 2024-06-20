import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Request } from 'express';
import User from '../../database/models/User';
import passport from 'passport';
// Auth Config 
import Config from '../../config/auth/auth.config';
// Get the jwtSecret from the config file
const {jwtSecret} = Config;

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: jwtSecret,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findOne(
        { 
          where: { id: jwtPayload.id },
          include: ["roles"],
        }, 
        
      );

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const roles = user.roles.map(role => role.name);

      const userInfo = {
        id: user.id,
        roles,
      }

      return done(null, userInfo);
    } catch (err) {
      return done(err);
    }
  })
);

export const authenticateJwt = passport.authenticate('jwt', { session: false });