import User from "../database/models/User";
import passport from "passport";

import { Strategy as LocalStrategy } from "passport-local";

passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            const user = await User.findOne({ where: { username: username}})
            if(!user) {
                return done(null, false, { message: "Incorrect username"})
            }
            // Password validation

            
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
))