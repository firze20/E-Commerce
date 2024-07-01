import {Router} from 'express';
import {getAllCategoriesController, getSingleCategoryController} from "../../../controllers/shop/categories.controller";

const categoryRouter = Router();

// Get all categories
/**
 * @openapi
 * /api/e-commerce/store/categories:
 *  get:
 *    tags:
 *      - Store
 *    description: "Get all categories in the store."
 *    responses:
 *      200:
 *        description: Successfully retrieved categories
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  name:
 *                    type: string
 *                    example: "Electronics"
 *                  description:
 *                    type: string
 *                    example: "Electronics category"
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Failed to retrieve categories"
 */
categoryRouter.get('/', getAllCategoriesController);

// Get single category
/**
 * @openapi
 * /api/e-commerce/store/categories/{id}:
 *  get:
 *    tags:
 *      - Store
 *    description: "Get a category by its ID."
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the category
 *        schema:
 *          type: integer
 *          example: 1
 *    responses:
 *      200:
 *        description: Successfully retrieved category
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 1
 *                name:
 *                  type: string
 *                  example: "Electronics"
 *                description:
 *                  type: string
 *                  example: "Electronics category"
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                  example: "2024-06-25T10:26:44.065Z"
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *                  example: "2024-06-25T10:26:44.065Z"
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Failed to retrieve category"
 */
categoryRouter.get('/:id', getSingleCategoryController);



export default categoryRouter;