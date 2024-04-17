import express from "express";
import helmet from "helmet";
import connectDatabase from "./connect";
import passport from "passport";
import morgan from "morgan";
//Routes
import mainRouter from "../routes";

const isDev = process.env.NODE_ENV === 'development';

function createServer() {
  const app = express();
  
  // Global Middlewares

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(helmet()); // to hide the type of application 

  app.use(morgan(isDev ? 'dev' : 'tiny'))

  app.use(passport.initialize()); // helps secure endpoints

  // End Global Middlewares

  //Routes

  app.use("/", mainRouter);
  // End of Routes

  connectDatabase();

  return app;
}

export default createServer;
