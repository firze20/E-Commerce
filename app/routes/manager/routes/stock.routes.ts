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

/**
 * @openapi
 * /api/e-commerce/manager/stock/{id}/add:
 *  post:
 *    tags:
 *      - Manager
 *    description: "Add stock to an item."
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the item to add stock to
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              quantity:
 *                type: integer
 *                description: The quantity of stock to add
 *                example: 10
 *    responses:
 *      200:
 *        description: Stock added successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Stock added successfully"
 *      401:
 *        description: Unauthorized access.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: "Unauthorized"
 *      403:
 *        description: Forbidden.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "You don't have permission to access this route"
 *      404:
 *        description: Item not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Item not found"
 *      500:
 *        description: Server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "An error occurred while adding stock"
 */
stockRouter.post("/:id/add", authenticateJwt, isManager, addStockController);

/**
 * @openapi
 * /api/e-commerce/manager/stock/{id}/remove:
 *  post:
 *    tags:
 *      - Manager
 *    description: "Remove stock to an item."
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the item to add stock to
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              quantity:
 *                type: integer
 *                description: The quantity of stock to add
 *                example: 10
 *    responses:
 *      200:
 *        description: Stock added successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Successfully decreased item stock"
 *      401:
 *        description: Unauthorized access.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: "Unauthorized"
 *      403:
 *        description: Forbidden.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "You don't have permission to access this route"
 *      404:
 *        description: Item not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Item not found"
 *      500:
 *        description: Server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "An error occurred while removing stock"
 */
stockRouter.post("/:id/remove", authenticateJwt, isManager, removeStockController);

export default stockRouter;

