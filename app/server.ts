import express, { Request, Response } from "express";
import helmet from "helmet";

//import dbInit from "./db/db.init";

const app = express();

const port = process.env.PORT || 3000;

//dbInit();

// Global Middlewares

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

// End Global Middlewares

// Simple Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({"message": "Hello World"});
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
