import { Router } from "express";

import {
    isAdmin,
    checkRolesExistance,
    authenticateJwt
} from "../../middlewares";


import {
    getAllUsersController,
    getUserController,
    addUserRolesController,
    removeUserRolesController,
    removeUserController,
    getAllPurchasesController
} from "../../controllers/admin/admin.controller";

const adminRouter = Router();

/**
 * @openapi
 * /api/e-commerce/admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     description: "Get all users."
 *     security:
 *       - cookieAuth: []
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
 *         description: "Number of users per page"
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: "Filter users by name"
 *     responses:
 *       200:
 *         description: "Retrieve users"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       username:
 *                         type: string
 *                         example: "john_doe"
 *                       email:
 *                         type: string
 *                         example: "john_doe@example.com"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       age:
 *                         type: integer
 *                         example: 30
 *                       roles:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "user"
 *                       verified:
 *                         type: boolean
 *                         example: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-06-25T10:26:44.065Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-06-25T10:26:44.065Z"
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 perPage:
 *                   type: integer
 *                   example: 10
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       403:
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You don't have permission to access this route"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error getting all users"
 */
adminRouter.get("/users", [authenticateJwt, isAdmin], getAllUsersController);

/**
 * @openapi
 * /api/e-commerce/admin/users/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     description: "Get user by ID."
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the user to retrieve"
 *     responses:
 *       200:
 *         description: "Retrieve user by ID"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "john_doe"
 *                 email:
 *                   type: string
 *                   example: "john_doe@example.com"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 age:
 *                   type: integer
 *                   example: 30
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "user"
 *                 verified:
 *                   type: boolean
 *                   example: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-25T10:26:44.065Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-25T10:26:44.065Z"
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       403:
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You don't have permission to access this route"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User doesn't exist"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error getting user"
 */
adminRouter.get("/users/:id", [authenticateJwt, isAdmin], getUserController);

/**
 * @openapi
 * /api/e-commerce/admin/users/{id}:
 *   post:
 *     tags:
 *       - Admin
 *     description: "Add roles to a user."
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the user to add roles to"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of roles to add to the user"
 *                 example: ["admin", "manager"]
 *     responses:
 *       200:
 *         description: "Role added to user successfully."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role added to user"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *                     email:
 *                       type: string
 *                       example: "john_doe@example.com"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     age:
 *                       type: integer
 *                       example: 30
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "admin"
 *                     verified:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-25T10:26:44.065Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-25T10:26:44.065Z"
 *       400:
 *         description: Bad request. Roles not provided or roles not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Roles not found"
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       403:
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You don't have permission to access this route"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User doesn't exist"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error adding role to user"
 */
adminRouter.post("/users/:id", [authenticateJwt, isAdmin, checkRolesExistance], addUserRolesController);

/**
 * @openapi
 * /api/e-commerce/admin/users/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     description: "Remove roles from a user."
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the user to remove roles from"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of roles to remove from the user"
 *                 example: ["admin", "manager"]
 *     responses:
 *       200:
 *         description: "Role removed from user successfully."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role removed from user"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *                     email:
 *                       type: string
 *                       example: "john_doe@example.com"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     age:
 *                       type: integer
 *                       example: 30
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "admin"
 *                     verified:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-25T10:26:44.065Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-25T10:26:44.065Z"
 *       400:
 *         description: Bad request. Roles not provided or roles not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Roles not found"
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       403:
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You don't have permission to access this route"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User doesn't exist"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error removing role from user"
 */
adminRouter.put("/users/:id", [authenticateJwt, isAdmin, checkRolesExistance], removeUserRolesController);

/**
 * @openapi
 * /api/e-commerce/admin/users/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     description: "Delete a user by ID."
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the user to delete"
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted"
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       403:
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You don't have permission to access this route"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User doesn't exist"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error deleting user"
 */
adminRouter.delete("/users/:id", [authenticateJwt, isAdmin], removeUserController);

/**
 * @openapi
 * /api/e-commerce/admin/purchases:
 *  get:
 *    tags:
 *      - Admin
 *    description: "Get all user purchases"
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - name: page
 *        in: query
 *        required: false
 *        schema:
 *          type: integer
 *          example: 1
 *      - name: limit
 *        in: query
 *        required: false
 *        schema:
 *          type: integer
 *          example: 10
 *      - name: username
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          example: "johndoe"
 *      - name: minDate
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          format: date-time
 *          example: "2024-01-01T00:00:00.000Z"
 *      - name: maxDate
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          format: date-time
 *          example: "2024-12-31T23:59:59.999Z"
 *    responses:
 *      200:
 *        description: Purchases retrieved successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                purchases:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 2
 *                      totalPrice:
 *                        type: string
 *                        example: "399.00"
 *                      createdAt:
 *                        type: string
 *                        format: date-time
 *                        example: "2024-06-28T22:49:15.093Z"
 *                      items:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            name:
 *                              type: string
 *                              example: "Steam Deck"
 *                            price:
 *                              type: string
 *                              example: "399.00"
 *                            description:
 *                              type: string
 *                              example: "A handheld gaming console"
 *                            image:
 *                              type: string
 *                              example: "https://clan.akamai.steamstatic.com/images//39049601/a1aa0624727ea6fd61bd179d214eaca1904fae45.png"
 *                      user:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                            example: 1
 *                          username:
 *                            type: string
 *                            example: "joe300"
 *                          email:
 *                            type: string
 *                            example: "joe_sam@gmail.com"
 *                          name:
 *                            type: string
 *                            example: "Joe"
 *                          age:
 *                            type: integer
 *                            example: 19
 *                          roles:
 *                            type: array
 *                            items:
 *                              type: string
 *                          verified:
 *                            type: boolean
 *                            example: false
 *                          createdAt:
 *                            type: string
 *                            format: date-time
 *                            example: "2024-06-28T22:20:55.277Z"
 *                          updatedAt:
 *                            type: string
 *                            format: date-time
 *                            example: "2024-06-28T22:20:55.277Z"
 *                totalPages:
 *                  type: integer
 *                  example: 1
 *                currentPage:
 *                  type: integer
 *                  example: 1
 *                perPage:
 *                  type: integer
 *                  example: 10
 *      400:
 *        description: Invalid minDate or maxDate.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Invalid Dates"
 *      401:
 *        description: Unauthorized.
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
 */
adminRouter.get("/purchases", [authenticateJwt, isAdmin], getAllPurchasesController);

export default adminRouter;



