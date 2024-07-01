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
myCartRouter.get("/", authenticateJwt, getMyCartController);

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
 *      401:
 *        description: Unauthorized access.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: "Unauthorized"
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
 *      404_1:
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
 *                  example: "Error occurred while adding item to cart"
 */
myCartRouter.post("/:id", authenticateJwt, addItemToCartController);

/**
 * @openapi
 * /api/e-commerce/store/my-cart/{id}:
 *  put:
 *    tags:
 *      - Store
 *    description: "Update the quantity of an item in your cart."
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the item to update in the cart
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              quantity:
 *                type: integer
 *                description: The new quantity of the item
 *                example: 2
 *    responses:
 *      200:
 *        description: Item updated in cart successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Item updated in cart"
 *      401:
 *        description: Unauthorized access.
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: "Unauthorized"
 *      400:
 *        description: Bad request. Quantity not provided.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Provide a quantity you want to update"
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
 *      404_1:
 *        description: Item not found in cart.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Item not found in cart"
 *      500:
 *        description: Server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "An error occurred while updating item in cart"
 */
myCartRouter.put("/:id", authenticateJwt, updateItemInCartController);

/**
 * @openapi
 * /api/e-commerce/store/my-cart/{id}:
 *  delete:
 *    tags:
 *      - Store
 *    description: "Remove an item from your cart."
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the item to remove from the cart
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Item removed from cart successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Item removed from cart"
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
 *      404_1:
 *        description: Item not found in cart.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Item not found in cart"
 *      500:
 *        description: Server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "An error occurred while removing item from cart"
 */
myCartRouter.delete("/:id", authenticateJwt, removeItemFromCartController);

/**
 * @openapi
 * /api/e-commerce/store/my-cart:
 *  delete:
 *    tags:
 *      - Store
 *    description: "Empty the user's cart by removing all items."
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Cart emptied successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Cart emptied"
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
 *                  example: "An error occurred while emptying cart"
 */
myCartRouter.delete("/", authenticateJwt, emptyCartController );

export default myCartRouter;



