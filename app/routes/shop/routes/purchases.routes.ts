import { Router } from "express";
import { authenticateJwt } from "../../../middlewares";

import { makePurchaseController } from "../../../controllers/shop/purchase.controller";

const purchaseRouter = Router();

purchaseRouter.post("/", authenticateJwt, makePurchaseController);

export default purchaseRouter;

