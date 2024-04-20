import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../database/models/User"; // Import User model

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      // Find user by username
      const user = await User.findOne({ where: { username } });

      // If user not found or password is incorrect, return false
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      // User authenticated successfully, return user object
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
