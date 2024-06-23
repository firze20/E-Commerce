import { Router } from "express";
import stockRouter from "./routes/stock.routes";
import itemRouter from "./routes/item.routes";
import categoryRouter from "./routes/category.routes";

const managerRouter = Router();

// Manager Routes
managerRouter.use("/stock", stockRouter);
managerRouter.use("/item", itemRouter);
managerRouter.use("/category", categoryRouter);
export default managerRouter;
