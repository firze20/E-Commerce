import express from "express";
import helmet from "helmet";
import connectDatabase from "./connect";
import passport from "passport";
//Routes

import mainRouter from "../routes";

function createServer() {
  const app = express();
  
  // Global Middlewares

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(helmet()); // to hide the type of application 

  app.use(passport.initialize());

  // End Global Middlewares

  //Routes

  app.use("/", mainRouter);
  // End of Routes

  connectDatabase();

  return app;
}

export default createServer;
