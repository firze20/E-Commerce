import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Request } from 'express';
import User from '../../database/models/User';
import dotenv from 'dotenv';
import passport from 'passport';

dotenv.config();

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET as string,
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
        ...user,
        roles,
      }

      return done(null, userInfo);
    } catch (err) {
      return done(err);
    }
  })
);

export const authenticateJwt = passport.authenticate('jwt', { session: false });