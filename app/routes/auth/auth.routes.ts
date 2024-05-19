import {Router} from "express";

import { checkDuplicateEmail, checkDuplicateUsername } from "../../middlewares/auth/checkDuplicates";

import { signUpController, signInController } from "../../controllers/auth/auth.controller";

const authRouter = Router();

authRouter.post("/signup", [checkDuplicateUsername, checkDuplicateEmail], signUpController);

authRouter.post("/signin", signInController);



export default authRouter;


