import { Router } from "express";

import {
  getItemsFromStoreController,
} from "../../controllers/shop/items.controller";

import categoryRouter from "./routes/categories.routes";

import itemRouter from "./routes/items.routes";

import myCartRouter from "./routes/my-cart.routes";

import purchasesRouter from "./routes/purchases.routes";

const shopRouter = Router();

/**
 * @openapi
 * /api/e-commerce/store:
 *   get:
 *     tags:
 *       - Items
 *     description: "Get all items from the store."
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: "Page number for pagination"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: "Number of items per page"
 *     responses:
 *       200:
 *         description: "Retrieve items"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Box of Pencils"
 *                       description:
 *                         type: string
 *                         example: "A box of 100 pencils"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 2.5
 *                       image:
 *                         type: string
 *                         example: "https://e7.pngegg.com/pngimages/702/527/png-clipart-colored-pencil-crayon-boxed-color-pencil-png-material-color-splash.png"
 *                       stock:
 *                         type: object
 *                         properties:
 *                           quantity:
 *                             type: integer
 *                             example: 1
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               example: "Undefined"
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 perPage:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: "Server error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error getting items"
 */
shopRouter.get("/", getItemsFromStoreController);

// Shop routes
shopRouter.use("/item", itemRouter);
shopRouter.use("/categories", categoryRouter);
shopRouter.use("/my-cart", myCartRouter);
shopRouter.use("/purchase", purchasesRouter);


export default shopRouter;
