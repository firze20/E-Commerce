import { Request, Response, Router} from "express";
import authRouter from "./auth/auth.routes";
import myCartRouter from "./profile/my-cart.routes";
import shopRouter from "./shop/store.routes";
import { unknownEndpoint } from "./unknown/unknown.routes";



const mainRouter = Router();


/**
 * @openapi
 * /api/e-commerce:
 *  get:
 *      tags: 
 *         - Welcome Message
 *      description: "This is just a welcome message, indicating that the server is up and running."
 *      responses:
 *              200:
 *                  description: Server is up and running
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Welcome to E-Commerce API!
*              500:
 *                  description: Server error!
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 */                 
mainRouter.get("/", (req: Request, res: Response) => {
    res.status(200).send({"message": "Welcome to E-Commerce API!"});
});

// List of Routes
mainRouter.use("/auth", authRouter); // Authentication Router
mainRouter.use("/my-cart", myCartRouter); // Cart Routher
mainRouter.use("/store", shopRouter); // Store router

// Unknown Endpoints
mainRouter.use(unknownEndpoint);

export default mainRouter;