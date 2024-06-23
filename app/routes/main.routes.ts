import { Request, Response, Router} from "express";
import authRouter from "./auth/auth.routes";
import myCartRouter from "./cart/my-cart.routes";
import shopRouter from "./shop/shop.routes";
import adminRouter from "./admin/admin.routes";
import managerRouter from "./manager/manager.routes";
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
mainRouter.use("/admin", adminRouter) // Admin Router
mainRouter.use("/manager", managerRouter) // Manager Router

// Unknown Endpoints
mainRouter.use(unknownEndpoint);

export default mainRouter;