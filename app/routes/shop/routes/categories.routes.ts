import {Router} from 'express';
import {getAllCategoriesController} from "../../../controllers/shop/categories.controller";

const categoryRouter = Router();

// Get all categories
categoryRouter.get('/', getAllCategoriesController);

export default categoryRouter;