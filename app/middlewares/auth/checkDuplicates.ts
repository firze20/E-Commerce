import { Request, Response, NextFunction } from 'express';

import User from '../../database/models/User';

const checkDuplicateUsername = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    const existingUsername = await User.findOne({
        where: { username }
    });

    if(existingUsername){
        res.status(400).send({
            message: "Username is already in use"
        });
    }

    next();
}

const checkDuplicateEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const existingEmail = await User.findOne({
        where: { email }    
    });

    if(existingEmail) {
        res.status(400).send({
            message: "Email is already in use"
        })
    }

    next();
}

export { checkDuplicateUsername, checkDuplicateEmail };


