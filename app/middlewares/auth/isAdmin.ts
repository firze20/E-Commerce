import { Request, Response, NextFunction } from 'express';
import User from '../../database/models/User';


const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // by Passport jwt strategy
    if(user) {
        
    }
}