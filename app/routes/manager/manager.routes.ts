import { Router } from "express";
import stockRouter from "./routes/stock.routes";

const managerRouter = Router();

// Manager Routes
managerRouter.use("/stock", stockRouter);
export default managerRouter;
