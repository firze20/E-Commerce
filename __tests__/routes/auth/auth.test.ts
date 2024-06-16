import request from "supertest";

const app = global.__APP__;

describe("Test Authentication EndPoints", () => {
  test("Sign Up Authentication!", async () => {
    const response = await request(app)
      .post("/api/e-commerce/auth/signup")
      .send({
        username: "Test-User",
        email: "test-email@gmail.com",
        password: "password-100",
        roles: ["User"],
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
        roles: ["Client"],
      });
    expect(response.status).toBe(400);
  });

  test("Sign In Authentication!", async () => {
    const response = await request(app)
      .post("/api/e-commerce/auth/signin")
      .send({
        username: "Test-User",
        password: "password-100",
      });
    expect(response.status).toBe(200); // Expect to be status code 200
    const cookieHeader = response.headers["set-cookie"];
    expect(cookieHeader).toBeDefined(); // Expect Cookie to be set

    const cookies = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];

    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));

    const refreshCookie = cookies.find((cookie) =>
      cookie.startsWith("refreshToken=")
    );

    expect(jwtCookie).toBeDefined(); // Expect JWT Cookie to be set

    expect(refreshCookie).toBeDefined(); // Expect Refresh Cookie to be set
  });
  // Test refresh tokens
  test("Refresh token Endpoint! should return 401 if no refreshtoken in cookie", async () => {
    const response = await request(app).post(
      "/api/e-commerce/auth/refresh-token"
    );
    expect(response.status).toBe(401); // Expect to be status code 200
  });
});
