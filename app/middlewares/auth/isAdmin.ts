import { Request, Response, NextFunction } from 'express';
import User from '../../database/models/User';
import passport from "../../config/passportJWT"


const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt',
        { 
            session: false
        },
        async (err: Error | null, user: User | false, info: { message: string }) => {
            if(err) {
                return next(err);
            }
            if(!user) {
                return res.status(401).json({ message: "Unauthorized"})
            }

            // Check if User has the role of admin

            const isAdmin = await user.hasRole('admin');

            if(isAdmin) {
                return next();
            }

            return res.status(403).json({ message: "Forbidden, you are not an admin"})
        }
    )(req, res, next);
}

export default isAdmin;