import { Express } from "express";
import createServer from "../app/utils/server";

let server: Express;

beforeAll(async () => {
  server = await createServer();
  globalThis.app = server;
}, 25000);

