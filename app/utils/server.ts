import express from "express";
import helmet from "helmet";
import connectDatabase from "./connect";

//Routes

import mainRouter from "../routes";

function createServer() {
  const app = express();
  
  // Global Middlewares

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(helmet());

  // End Global Middlewares

  //Routes

  app.use("/", mainRouter);
  // End of Routes

  connectDatabase();

  return app;
}

export default createServer;
