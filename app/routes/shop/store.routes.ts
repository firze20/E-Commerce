import { Router } from "express";

import { getItemsFromStoreController } from "../../controllers/shop/items.controller";

const shopRouter = Router();

// Get all Items from Store

shopRouter.get("/", getItemsFromStoreController);

export default shopRouter;
