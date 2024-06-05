import { Router } from "express";

import {
  getItemsFromStoreController,
  getItemController,
  createItemController,
  deleteItemController,
  updateItemController,
} from "../../controllers/shop/items.controller";

import { authenticateJwt } from "../../middlewares/passport/passportJWT";
import { isAdmin } from "../../middlewares/auth";

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

shopRouter.get("/item/:id", getItemController);

shopRouter.post("/item", [authenticateJwt, isAdmin], createItemController);

shopRouter.delete(
  "/item/:id",
  [authenticateJwt, isAdmin],
  deleteItemController
);

shopRouter.put("/item/:id", [authenticateJwt, isAdmin], updateItemController);

export default shopRouter;
