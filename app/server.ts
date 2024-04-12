import express, { Request, Response } from "express";

import dbInit from "./db/db.init";

const app = express();

const port = process.env.PORT || 3000;

dbInit();

// Simple Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
