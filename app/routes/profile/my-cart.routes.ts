import { Router } from "express";
import { authenticateJwt } from "../../middlewares/passport/passportJWT";

const myCartRouter = Router();

myCartRouter.get("/", authenticateJwt, (req: any, res: any) => {
  res.status(200).send({ message: "Welcome to My Cart" });
});

export default myCartRouter;



