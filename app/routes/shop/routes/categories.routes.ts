import {Router} from 'express';
import {getAllCategoriesController, getSingleCategoryController} from "../../../controllers/shop/categories.controller";
import {authenticateJwt, isManager} from "../../../middlewares";

const categoryRouter = Router();

// Get all categories
categoryRouter.get('/', getAllCategoriesController);

// Get single category
categoryRouter.get('/:id', getSingleCategoryController);



export default categoryRouter;