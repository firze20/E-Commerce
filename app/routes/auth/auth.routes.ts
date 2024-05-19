import {Router} from "express";

import { checkDuplicateEmail, checkDuplicateUsername } from "../../middlewares/auth/checkDuplicates";

import { signUpController } from "../../controllers/auth/auth.controller";

const authRouter = Router();

authRouter.post("/signup", [checkDuplicateUsername, checkDuplicateEmail], signUpController);



export default authRouter;


