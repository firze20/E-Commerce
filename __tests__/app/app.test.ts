import request from "supertest";
import createServer from "../../app/utils/server";
import { closeDatabase, connectDatabase } from "../../app/utils/connect";

const app = createServer();

const dbTeardown = async () => {
  await closeDatabase();
};

describe("Application Endpoint tests", () => {
  beforeAll(async () => {
    await connectDatabase();
  }, 25000);


  

  afterAll(async () => {
    await dbTeardown();
  });
})