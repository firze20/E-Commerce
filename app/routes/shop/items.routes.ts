import { Router } from "express";

import {
  getItemsFromStoreController,
  getItemController,
  createItemController,
  deleteItemController,
  updateItemController,
} from "../../controllers/shop/items.controller";

import { authenticateJwt, isManager } from "../../middlewares";

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
/**
 * @openapi
 * /api/e-commerce/store/item/{id}:
 *   get:
 *     tags:
 *       - Items
 *     description: "Get a specific item by ID from the store."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID of the item"
 *     responses:
 *       200:
 *         description: "Retrieve item by ID"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     name:
 *                       type: string
 *                       example: "Steam Deck"
 *                     description:
 *                       type: string
 *                       example: "A handheld gaming console"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 399
 *                     image:
 *                       type: string
 *                       example: "https://clan.akamai.steamstatic.com/images//39049601/a1aa0624727ea6fd61bd179d214eaca1904fae45.png"
 *                     stock:
 *                       type: integer
 *                       example: 1
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "Undefined"
 *       404:
 *         description: "Item not found"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found"
 *       500:
 *         description: "Server error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error getting item"
 */
shopRouter.get("/item/:id", getItemController);
/**
 * @openapi
 * /api/e-commerce/store/item:
 *   post:
 *     tags:
 *       - Items
 *     description: "Create a new item in the store."
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the item"
 *                 example: "Sandals"
 *               description:
 *                 type: string
 *                 description: "Description of the item"
 *                 example: "A pair of sandals to walk on the beach"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: "Price of the item"
 *                 example: 12.99
 *               image:
 *                 type: string
 *                 description: "URL of the item image"
 *                 example: "https://e7.pngegg.com/pngimages/996/985/png-clipart-sandals-sandals.png"
 *     responses:
 *       201:
 *         description: "Item created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item created!"
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 7
 *                     name:
 *                       type: string
 *                       example: "Sandals"
 *                     description:
 *                       type: string
 *                       example: "A pair of sandals to walk on the beach"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 12.99
 *                     image:
 *                       type: string
 *                       example: "https://e7.pngegg.com/pngimages/996/985/png-clipart-sandals-sandals.png"
 *                     stockId:
 *                       type: integer
 *                       example: 7
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-05T20:13:32.724Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-05T20:13:32.988Z"
 *       401:
 *         description: "Unauthorized"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       500:
 *         description: "Error creating item"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating item"
 */
shopRouter.post("/item", [authenticateJwt, isManager], createItemController);
/**
 * @openapi
 * /api/e-commerce/store/item/{id}:
 *   delete:
 *     tags:
 *       - Items
 *     description: "Deletes an existing item in the store."
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID of the item to delete"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the item"
 *                 example: "Box of Pencils"
 *               description:
 *                 type: string
 *                 description: "Description of the item"
 *                 example: "A box of 200 pencils!"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: "Price of the item"
 *                 example: 2.5
 *               image:
 *                 type: string
 *                 description: "URL of the item image"
 *                 example: "https://e7.pngegg.com/pngimages/702/527/png-clipart-colored-pencil-crayon-boxed-color-pencil-png-material-color-splash.png"
 *               stockId:
 *                 type: integer
 *                 description: "ID of the stock associated with the item"
 *                 example: 1
 *     responses:
 *       200:
 *         description: "Item updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item deleted!"
 *       500:
 *         description: "Error updating item"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating item"
 */
shopRouter.delete(
  "/item/:id",
  [authenticateJwt, isManager],
  deleteItemController
);
/**
 * @openapi
 * /api/e-commerce/store/item/{id}:
 *   put:
 *     tags:
 *       - Items
 *     description: "Update an existing item in the store."
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID of the item to update"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the item"
 *                 example: "Box of Pencils"
 *               description:
 *                 type: string
 *                 description: "Description of the item"
 *                 example: "A box of 200 pencils!"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: "Price of the item"
 *                 example: 2.5
 *               image:
 *                 type: string
 *                 description: "URL of the item image"
 *                 example: "https://e7.pngegg.com/pngimages/702/527/png-clipart-colored-pencil-crayon-boxed-color-pencil-png-material-color-splash.png"
 *               stockId:
 *                 type: integer
 *                 description: "ID of the stock associated with the item"
 *                 example: 1
 *     responses:
 *       200:
 *         description: "Item updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item updated!"
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Box of Pencils"
 *                     description:
 *                       type: string
 *                       example: "A box of 200 pencils!"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 2.5
 *                     image:
 *                       type: string
 *                       example: "https://e7.pngegg.com/pngimages/702/527/png-clipart-colored-pencil-crayon-boxed-color-pencil-png-material-color-splash.png"
 *                     stockId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-05T20:30:30.025Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-05T20:30:54.457Z"
 *       500:
 *         description: "Error updating item"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating item"
 */
shopRouter.put("/item/:id", [authenticateJwt, isManager], updateItemController);

export default shopRouter;
