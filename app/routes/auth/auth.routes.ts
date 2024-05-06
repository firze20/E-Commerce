import {Request, Response, Router} from "express";
import Role from "../../database/models/Role";
import User from "../../database/models/User";
import logger from "../../utils/logger";

const authRouter = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {

    try {
        const { username, password, email, name, age, roles } = req.body;
        const user = await User.create({
            username,
            password,
            email,
            name,
            age,
        });
    
        if(roles) {
            const findRoles = await Role.findAll({
                where : {
                    name: roles
                }
            })
    
            if(findRoles) {
                user.addRoles(roles);
            }
        }
    
        res.status(201).send({
            message: "User created!"
        });

        logger.info(`User ${user.username} created!`);
    } catch (err: any) {
        logger.error(err);

        res.status(400).send({
            message: err.message
        });
    }

   
});



export default authRouter;


