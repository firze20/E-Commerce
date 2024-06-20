import { Router } from "express";
import { authenticateJwt } from "../../middlewares/passport/passportJWT";

import { getMyCartController } from "../../controllers/shop/cart.controller";

const myCartRouter = Router();

myCartRouter.get("/", authenticateJwt, getMyCartController );
export default myCartRouter;



