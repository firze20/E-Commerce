import { Router } from "express";

import {
  checkDuplicateEmail,
  checkDuplicateUsername,
  checkRolesExistance,
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
 *              roles:
 *                type: array
 *                items:
 *                  type: string
 *                description: "User's roles."
 *                example: ["User", "Moderator", "Admin"]
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
 *                              example: "Username|Email is already in use"
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

authRouter.post("/refresh-token", [verifyRefreshToken], refreshTokenController);


export default authRouter;
