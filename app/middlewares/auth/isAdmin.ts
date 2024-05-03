import { Request, Response, NextFunction } from 'express';
import User from '../../database/models/User';
import passport from "../../config/passportJWT"


const isAdmin = (req: Request, res: Response, next: NextFunction) => {
   

}

export default isAdmin;