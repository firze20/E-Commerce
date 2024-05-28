import request from "supertest";
import createServer from "../../../app/utils/server";
import { closeDatabase, connectDatabase } from "../../../app/utils/connect";

const app = createServer();

const dbTeardown = async () => {
  await closeDatabase();
};

describe("Test Shop EndPoints", () => {
  beforeAll(async () => {
    await connectDatabase();
  }, 25000);

  test("Test shop items list!", async () => {
    const response = await request(app)
      .get("/api/e-commerce/store")
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(res.body).toBeInstanceOf(Array);
      })
  })
})