import {Router} from "express";

import { checkDuplicateEmail, checkDuplicateUsername, checkRolesExistance } from "../../middlewares/auth";

import { signUpController, signInController } from "../../controllers/auth/auth.controller";

const authRouter = Router();

authRouter.post("/signup", [checkDuplicateUsername, checkDuplicateEmail, checkRolesExistance], signUpController);

authRouter.post("/signin", signInController);

export default authRouter;


