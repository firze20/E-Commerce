import { Router } from "express";

import {
    createItemController,
    deleteItemController,
    updateItemController,
} from "../../../controllers/manager/items.controller";

import { authenticateJwt, isManager } from "../../../middlewares";

const itemRouter = Router();

/**
 * @openapi
 * /api/e-commerce/manager/item:
 *   post:
 *     tags:
 *       - Manager
 *     description: "Create a new item in the store. Requires Manager role"
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
itemRouter.post("/", [authenticateJwt, isManager], createItemController);
/**
 * @openapi
 * /api/e-commerce/manager/item/{id}:
 *   delete:
 *     tags:
 *       - Manager
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
 *     responses:
 *       200:
 *         description: "Item deleted successfully"
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
itemRouter.delete(
  "/:id",
  [authenticateJwt, isManager],
  deleteItemController
);
/**
 * @openapi
 * /api/e-commerce/store/item/{id}:
 *   put:
 *     tags:
 *       - Manager
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
itemRouter.put("/:id", [authenticateJwt, isManager], updateItemController);

export default itemRouter;
