import express, { Request, Response} from "express";

const mainRouter = express.Router();

mainRouter.get("/", (req: Request, res: Response) => {
    res.status(200).send({"message": "Welcome to E-Commerce API!"});
})

export default mainRouter;