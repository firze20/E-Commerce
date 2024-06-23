import {Router} from 'express';
import {getAllCategoriesController, getSingleCategoryController} from "../../../controllers/shop/categories.controller";

const categoryRouter = Router();

// Get all categories
categoryRouter.get('/', getAllCategoriesController);

// Get single category
categoryRouter.get('/:id', getSingleCategoryController);



export default categoryRouter;