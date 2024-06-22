import { Router } from "express";

import {
    isAdmin
} from "../../middlewares/auth";

import {
    authenticateJwt
} from "../../middlewares/passport/passportJWT"


import {
    getAllUsersController
} from "../../controllers/admin/admin.controller";

const adminRouter = Router();

adminRouter.get("/users", [authenticateJwt, isAdmin], getAllUsersController);

export default adminRouter;