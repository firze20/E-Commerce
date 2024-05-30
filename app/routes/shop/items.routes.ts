import { Router } from "express";

import { getItemsFromStoreController, getItemController } from "../../controllers/shop/items.controller";

const shopRouter = Router();

shopRouter.get("/", getItemsFromStoreController);

shopRouter.get("/item/:id", getItemController);

export default shopRouter;
