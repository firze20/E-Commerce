import express from "express";
import helmet from "helmet";
import passport from "passport";
import morgan from "morgan";
import bodyParser from "body-parser";
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



  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  // End Global Middlewares

  //Routes
  app.use("/api/e-commerce", mainRouter);

  // End of Routes

  return app;
}

export default createServer;
