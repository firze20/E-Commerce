import { Request, Response, Router} from "express";
import authRouter from "./auth/auth.routes";
import myCartRouter from "./profile/my-cart.routes";

const mainRouter = Router();

mainRouter.get("/", (req: Request, res: Response) => {
    res.status(200).send({"message": "Welcome to E-Commerce API!"});
});

mainRouter.use("/auth", authRouter);
mainRouter.use("/my-cart", myCartRouter);

export default mainRouter;