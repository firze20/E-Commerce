import { Router } from "express";

import {
  getItemController,
} from "../../../controllers/shop/items.controller";

const itemRouter = Router();

/**
 * @openapi
 * /api/e-commerce/store/item/{id}:
 *   get:
 *     tags:
 *       - Store
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
itemRouter.get("/:id", getItemController);


export default itemRouter;
