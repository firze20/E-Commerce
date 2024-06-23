import { Router } from "express";

import {
    authenticateJwt,
    isManager
} from "../../../middlewares";

import {
    addStockController,
    removeStockController
} from "../../../controllers/manager/stock.controller";

const stockRouter = Router();

stockRouter.post("/:id/add", authenticateJwt, isManager, addStockController);

stockRouter.post("/:id/remove", authenticateJwt, isManager, removeStockController);

export default stockRouter;

