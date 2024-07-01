import {Router} from 'express';
import {postCategoryController, editCategoryController, removeCategoryController} from "../../../controllers/manager/category.controller";
import {authenticateJwt, isManager} from "../../../middlewares";

const categoryRouter = Router();


// Create a new category
/**
 * @openapi
 * /api/e-commerce/manager/category:
 *  post:
 *    tags:
 *      - Manager
 *    description: "Create a new category."
 *    security:
 *      - cookieAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "Name of the category."
 *                example: "Movies"
 *              description:
 *                type: string
 *                description: "Description of the category."
 *                example: "Digital and Physical movies!"
 *    responses:
 *      201:
 *        description: Category created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Category created"
 *                category:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      example: 1
 *                    name:
 *                      type: string
 *                      example: "Movies"
 *                    description:
 *                      type: string
 *                      example: "Digital and Physical movies!"
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                    updatedAt:
 *                      type: string
 *                      format: date-time
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
 *      500:
 *        description: Server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Failed to create category"
 */
categoryRouter.post('/', [authenticateJwt, isManager], postCategoryController);

// Edit a category
/**
 * @openapi
 * /api/e-commerce/manager/category/{id}:
 *  put:
 *    tags:
 *      - Manager
 *    description: "Update an existing category."
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the category to update
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "Name of the category."
 *                example: "Movies"
 *              description:
 *                type: string
 *                description: "Description of the category."
 *                example: "Digital and Physical movies!"
 *    responses:
 *      200:
 *        description: Category updated successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Category updated"
 *                category:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      example: 1
 *                    name:
 *                      type: string
 *                      example: "Movies"
 *                    description:
 *                      type: string
 *                      example: "Digital and Physical movies!"
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                    updatedAt:
 *                      type: string
 *                      format: date-time
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
 *        description: Category not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Category not found"
 *      500:
 *        description: Server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Failed to update category"
 */
categoryRouter.put('/:id', [authenticateJwt, isManager], editCategoryController);

// Delete a category
/**
 * @openapi
 * /api/e-commerce/manager/category/{id}:
 *  delete:
 *    tags:
 *      - Manager
 *    description: "Delete an existing category."
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of the category to delete
 *        schema:
 *          type: integer
 *    responses:
 *      204:
 *        description: Category deleted successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Category deleted"
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
 *        description: Category not found.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Category not found"
 *      500:
 *        description: Server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Failed to delete category"
 */
categoryRouter.delete('/:id', [authenticateJwt, isManager], removeCategoryController);


export default categoryRouter;