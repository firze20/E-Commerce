import { Router } from "express";

import { getItemsFromStoreController, getItemController, createItemController } from "../../controllers/shop/items.controller";

import { authenticateJwt } from "../../middlewares/passport/passportJWT";
import { isAdmin } from "../../middlewares/auth/isRole";

const shopRouter = Router();

shopRouter.get("/", getItemsFromStoreController);

shopRouter.get("/item/:id", getItemController);

shopRouter.post("/item", [authenticateJwt, isAdmin], createItemController)


export default shopRouter;
