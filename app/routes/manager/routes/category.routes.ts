import {Router} from 'express';
import {postCategoryController, editCategoryController, removeCategoryController} from "../../../controllers/manager/category.controller";
import {authenticateJwt, isManager} from "../../../middlewares";

const categoryRouter = Router();


// Create a new category
categoryRouter.post('/', [authenticateJwt, isManager], postCategoryController);

// Edit a category
categoryRouter.put('/:id', [authenticateJwt, isManager], editCategoryController);

// Delete a category
categoryRouter.delete('/:id', [authenticateJwt, isManager], removeCategoryController);


export default categoryRouter;