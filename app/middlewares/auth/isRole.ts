import { Request, Response, NextFunction } from 'express';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.roles && req.user.roles.includes('Admin')) {
        next();
      } else {
        res.status(403).send({ message: "You don't have permission to access this route" });
      }
}

export {
    isAdmin
}