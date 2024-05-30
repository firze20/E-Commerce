import { Request, Response, NextFunction } from 'express';
import User from '../../database/models/User';


const isAdmin = (req: Request, res: Response, next: NextFunction) => {

}

export {
    isAdmin
}