import express from "express";
import { connectDatabase } from "../utils/connect"
import cookieParser from "cookie-parser";
import helmet from "helmet";
import passport from "passport";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
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
async function createServer() {

  const corsOptions: CorsOptions = {
    origin: "http://localhost:3000",
  };

  await connectDatabase();

  const app = express();

  // Global Middlewares

  app.use(cors(corsOptions)); // Enable CORS with specific options

  app.use(express.json()); // Parse JSON payloads

  // Cookie Parser

  app.use(cookieParser()); // Parse Cookie header and populate req.cookies

  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

  app.use(helmet()); // Set security-related HTTP headers

  app.use(morgan(isDev ? "dev" : "tiny")); // Log HTTP requests

  // Passport middleware
  app.use(passport.initialize()); // Initialize Passport for authentication

  // End Global Middlewares

  //Routes
  app.use("/api/e-commerce", mainRouter);

  // End of Routes

  return app;
}

export default createServer;
