import { Router } from "express";
import { authenticateJwt } from "../../../middlewares";

import { getMyCartController, addItemToCartController, updateItemInCartController, removeItemFromCartController, emptyCartController } from "../../../controllers/shop/cart.controller";

const myCartRouter = Router();

/**
 * @openapi
 * /api/e-commerce/store/my-cart:
 *  get:
 *    tags:
 *      - Store
 *    description: "Retrieve your cart."
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Cart retrieved successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                cart:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      name:
 *                        type: string
 *                        example: "Box of Pencils"
 *                      description:
 *                        type: string
 *                        example: "A box of 100 pencils"
 *                      image:
 *                        type: string
 *                        example: "https://e7.pngegg.com/pngimages/702/527/png-clipart-colored-pencil-crayon-boxed-color-pencil-png-material-color-splash.png"
 *                      price:
 *                        type: string
 *                        example: "2.50"
 *                      quantity:
 *                        type: integer
 *                        example: 1
 *                totalItems:
 *                  type: integer
 *                  example: 1
 *                totalPrice:
 *                  type: number
 *                  example: 2.5
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
 *        description: An error occurred while retrieving the cart.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "An error occurred while retrieving the cart"
 */
myCartRouter.get("/", authenticateJwt, getMyCartController );
/**
 * @openapi
 * /api/e-commerce/store/my-cart/{id}:
 *  post:
 *    tags:
 *      - Store
 *    description: "Add an item's to your cart."
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the item to add to the cart
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
 *                description: The quantity of the item to add
 *                example: 1
 *    responses:
 *      200:
 *        description: Item added to cart successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Item added to cart!"
 *      404:
 *        description: Item or cart not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Item not found" | "Cart not found"
 *      500:
 *        description: Server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Error occurred while adding item to cart"
 */
myCartRouter.post("/:id", authenticateJwt, addItemToCartController );

myCartRouter.put("/:id", authenticateJwt, updateItemInCartController );
myCartRouter.delete("/:id", authenticateJwt, removeItemFromCartController );
myCartRouter.delete("/", authenticateJwt, emptyCartController );

export default myCartRouter;



