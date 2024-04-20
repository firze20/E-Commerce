import request from "supertest";
import createServer from "../../../app/utils/server";

const app = createServer();

describe("Test Authentication EndPoints", () => {
beforeAll(async () => {
    // Should sync database
});


  test("Sign Up Authentication!", async () => {
    const response = await request(app).post("/api/e-commerce/auth/signup").send({
      username: "Test-User",
      email: "test-email@gmail.com",
      password: "password-100",
    });
    expect(response.status).toBe(200);
  });

  test("Sign In Authentication!", async () => {

    const response = await request(app).post("/api/e-commerce/auth/signin").send({
      username: "Test-User",
      password: "password-100",
    });
    expect(response.status).toBe(200);
  });
  })

  