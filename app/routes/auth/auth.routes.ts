import {Request, Response, Router} from "express";

const authRouter = Router();

authRouter.post("/signup", (req: Request, res: Response) => {
    res.status(201).send({
        message: "User created!"
    });
});



export default authRouter;


