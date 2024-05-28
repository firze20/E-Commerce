import request from "supertest";
import createServer from "../../../app/utils/server";
import { closeDatabase, connectDatabase } from "../../../app/utils/connect";

const app = createServer();

const dbTeardown = async () => {
  await closeDatabase();
};

describe("Test Authentication EndPoints", () => {
  beforeAll(async () => {
    await connectDatabase();
  }, 25000);

  test("Sign Up Authentication!", async () => {
    const response = await request(app)
      .post("/api/e-commerce/auth/signup")
      .send({
        username: "Test-User",
        email: "test-email@gmail.com",
        password: "password-100",
        roles: ["User"]
      });
    expect(response.status).toBe(201);
  });

  test("Sign Up Authentication unexisting role!", async () => {
    const response = await request(app)
      .post("/api/e-commerce/auth/signup")
      .send({
        username: "Test-User3",
        email: "test-email4@gmail.com",
        password: "password-100",
        roles: ["Client"]
      });
    expect(response.status).toBe(400);
  })

  test("Sign In Authentication!", async () => {
    const response = await request(app)
      .post("/api/e-commerce/auth/signin")
      .send({
        username: "Test-User",
        password: "password-100",
      });
    expect(response.status).toBe(200); // Expect to be status code 200
    const cookieHeader = response.headers["set-cookie"];
    expect(cookieHeader).toBeDefined() // Expect Cookie to be set

    const cookies = Array.isArray(cookieHeader)? cookieHeader : [cookieHeader];

    const jwtCookie = cookies.find(cookie => cookie.startsWith("jwt="));

    expect(jwtCookie).toBeDefined(); // Expect JWT Cookie to be set
  });

  afterAll(async () => {
    await dbTeardown();
  });
});
