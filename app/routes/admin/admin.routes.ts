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
    removeUserController
} from "../../controllers/admin/admin.controller";

const adminRouter = Router();

adminRouter.get("/users", [authenticateJwt, isAdmin], getAllUsersController);

adminRouter.get("/users/:id", [authenticateJwt, isAdmin], getUserController);

adminRouter.post("/users/:id", [authenticateJwt, isAdmin, checkRolesExistance], addUserRolesController);

adminRouter.put("/users/:id", [authenticateJwt, isAdmin, checkRolesExistance], removeUserRolesController);

adminRouter.delete("/users/:id", [authenticateJwt, isAdmin], removeUserController);

export default adminRouter;



