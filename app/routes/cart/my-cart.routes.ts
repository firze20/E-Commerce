import { Router } from "express";
import { authenticateJwt } from "../../middlewares";

import { getMyCartController } from "../../controllers/shop/cart.controller";

const myCartRouter = Router();

myCartRouter.get("/", authenticateJwt, getMyCartController );
export default myCartRouter;



