import { Router } from "express";
import { authenticateJwt } from "../../../middlewares";

import { getMyCartController, addItemToCartController, updateItemInCartController, removeItemFromCartController, emptyCartController } from "../../../controllers/shop/cart.controller";

const myCartRouter = Router();

myCartRouter.get("/", authenticateJwt, getMyCartController );
myCartRouter.post("/:id", authenticateJwt, addItemToCartController );
myCartRouter.put("/:id", authenticateJwt, updateItemInCartController );
myCartRouter.delete("/:id", authenticateJwt, removeItemFromCartController );
myCartRouter.delete("/", authenticateJwt, emptyCartController );

export default myCartRouter;



