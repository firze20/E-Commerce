import { Router } from "express";

import { getItemsFromStoreController } from "../../controllers/shop/items.controller";

const shopRouter = Router();

shopRouter.get("/", getItemsFromStoreController);

export default shopRouter;
