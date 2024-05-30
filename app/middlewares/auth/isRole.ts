import { Request, Response, NextFunction } from 'express';
import User from '../../database/models/User';


const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user!;
    if(id) {
        try {
            const user = await User.findByPk(id);
            if(user) {
                const canPass = await user.hasRole('Admin');
                if(canPass) {
                    next();
                } else {
                    return res.status(403).send({ message: "You are not allowed to access this route" });
                }
            }
        } catch (error) {
            res.status(500).send({ message: "Server error" });
        }
    }
}

export {
    isAdmin
}