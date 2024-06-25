import { Router } from "express";
import { authenticateJwt } from "../../../middlewares";

import { makePurchaseController } from "../../../controllers/shop/purchase.controller";

const purchaseRouter = Router();
/**
 * @openapi
 * /api/e-commerce/store/purchase:
 *  post:
 *    tags:
 *      - Store
 *    description: "Makes a purchase if the cart has items."
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      201:
 *        description: Purchase completed successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Purchase completed"
 *      401:
 *        description: Unauthorized access.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: "Unauthorized"
 *      404:
 *        description: Cart not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Cart not found"
 *      500:
 *        description: Server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Not enough stock for item {item name}"
 */
purchaseRouter.post("/", authenticateJwt, makePurchaseController);

export default purchaseRouter;

