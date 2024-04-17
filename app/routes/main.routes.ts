import { Request, Response, Router} from "express";

const mainRouter = Router();

mainRouter.get("/", (req: Request, res: Response) => {
    res.status(200).send({"message": "Welcome to E-Commerce API!"});
})

export default mainRouter;