import {Router} from 'express';
import {getAllCategoriesController, getSingleCategoryController, postCategoryController, editCategoryController, removeCategoryController} from "../../../controllers/shop/categories.controller";
import {authenticateJwt, isManager} from "../../../middlewares";

const categoryRouter = Router();

// Get all categories
categoryRouter.get('/', getAllCategoriesController);

// Get single category
categoryRouter.get('/:id', getSingleCategoryController);

// Create a new category
categoryRouter.post('/', [authenticateJwt, isManager], postCategoryController);

// Edit a category
categoryRouter.put('/:id', [authenticateJwt, isManager], editCategoryController);

// Delete a category
categoryRouter.delete('/:id', [authenticateJwt, isManager], removeCategoryController);


export default categoryRouter;