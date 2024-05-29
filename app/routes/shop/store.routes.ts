import { Router } from "express";

import { getItemsFromStoreController } from "../../controllers/shop/shop.controller";

const shopRouter = Router();

// Get all Items from Store

shopRouter.get("/", getItemsFromStoreController);

export default shopRouter;
