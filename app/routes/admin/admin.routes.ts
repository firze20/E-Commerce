import { Router } from "express";

import {
    isAdmin,
    checkRolesExistance,
    authenticateJwt
} from "../../middlewares";


import {
    getAllUsersController,
    getUserController
} from "../../controllers/admin/admin.controller";

const adminRouter = Router();

adminRouter.get("/users", [authenticateJwt, isAdmin], getAllUsersController);

adminRouter.get("/users/:id", [authenticateJwt, isAdmin], getUserController);

export default adminRouter;