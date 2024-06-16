import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import passport from "passport";
import morgan from "morgan";
//Routes
import mainRouter from "../routes";

const isDev = process.env.NODE_ENV === "development";
/**
 * Creates and configures an Express server.
 * 
 * This function sets up an Express server with global middlewares for JSON parsing, cookie parsing,
 * URL-encoded data parsing, security headers, request logging, and passport initialization. It also
 * sets up the main API routes for the e-commerce application.
 */
function createServer() {
  const app = express();

  // Global Middlewares

  app.use(express.json());

  // Cookie Parser

  app.use(cookieParser());

  app.use(express.urlencoded({ extended: true }));

  app.use(helmet()); // to hide the type of application

  app.use(morgan(isDev ? "dev" : "tiny"));

  //passport middleware
  app.use(passport.initialize()); // helps secure endpoints

  // End Global Middlewares

  //Routes
  app.use("/api/e-commerce", mainRouter);

  // End of Routes

  return app;
}

export default createServer;
