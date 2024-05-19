import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import User from "../database/models/User";

// Define options for JWT strategy
const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

// Define JWT strategy
passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async function (jwtPayload, done) {
  try {
    // Find user by id in the JWT payload
    const user = await User.findOne({ where: { id: jwtPayload.id } });

    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    // If user found, return user object
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

export const authenticateJwt = passport.authenticate("jwt", { session: false });