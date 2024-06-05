import { Router } from "express";

import { getItemsFromStoreController, getItemController, createItemController, deleteItemController, updateItemController } from "../../controllers/shop/items.controller";

import { authenticateJwt } from "../../middlewares/passport/passportJWT";
import { isAdmin } from "../../middlewares/auth";

const shopRouter = Router();

shopRouter.get("/", getItemsFromStoreController);

shopRouter.get("/item/:id", getItemController);

shopRouter.post("/item", [authenticateJwt, isAdmin], createItemController);

shopRouter.delete("/item/:id", [authenticateJwt, isAdmin], deleteItemController);

shopRouter.put("/item/:id", [authenticateJwt, isAdmin], updateItemController);

export default shopRouter;
