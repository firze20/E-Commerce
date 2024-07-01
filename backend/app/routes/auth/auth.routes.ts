import { Router } from "express";

import {
  checkDuplicateEmail,
  checkDuplicateUsername,
  verifyRefreshToken
} from "../../middlewares";

import {
  signUpController,
  signInController,
  refreshTokenController
} from "../../controllers/auth/auth.controller";

const authRouter = Router();

/**
 * @openapi
 * /api/e-commerce/auth/signup:
 *  post:
 *    tags:
 *      - Authentication
 *    description: "Register user endpoint."
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: "User's username."
 *                example: "johndoe"
 *              password:
 *                type: string
 *                description: "User's password."
 *                example: "sample_password_12345"
 *              email:
 *                type: string
 *                description: "User's email."
 *                example: "johndoe@hotmail.com"
 *              name:
 *                type: string
 *                description: "User's name."
 *                example: "John"
 *                nullable: true
 *              age:
 *                type: number
 *                description: "User's age."
 *                example: 21
 *                nullable: true
 *    responses:
 *      201:
 *        description: Successful sign up
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "User created!"
 *      400:
 *          description: Username or email already in use
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: "Username| Email is already in use"
 *      500:
 *        description: Server error!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Server error"
 */
authRouter.post(
  "/signup", // Route
  [checkDuplicateUsername, checkDuplicateEmail], // Middlewares
  signUpController // Controller
);
/**
 * @openapi
 * /api/e-commerce/auth/signin:
 *  post:
 *    tags:
 *      - Authentication
 *    description: "Login user endpoint."
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: "User's username."
 *                example: "johndoe"
 *              password:
 *                type: string
 *                description: "User's password."
 *                example: "sample_password_12345"
 *    responses:
 *      200:
 *        description: User authenticated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "User authenticated"
 *      404:
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "User not found"
 *      401:
 *        description: Invalid credentials
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Invalid credentials"
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Server error"
 */
authRouter.post("/signin", signInController);
/**
 * @openapi
 * /api/e-commerce/auth/refresh-token:
 *  post:
 *    tags:
 *      - Authentication
 *    description: "Refresh JWT token using the refresh token provided in cookies."
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Token refreshed successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Token refreshed"
 *      400:
 *        description: Bad request.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "Bad request"
 *      401_1:
 *        description: Unauthorized access.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "No refresh token provided"
 *      401_2:
 *        description: Invalid refresh token.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Invalid refresh token"
 *      401_3:
 *        description: Refresh token not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Refresh token not found"
 *      401_4:
 *        description: Refresh token has expired.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Refresh token has expired"
 *      404:
 *        description: User not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "User not found"
 *      500:
 *        description: Server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Server error"
 */
authRouter.post("/refresh-token", [verifyRefreshToken], refreshTokenController);


export default authRouter;
