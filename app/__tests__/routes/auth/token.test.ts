import request from "supertest";
import { generateRefreshToken } from "../../../utils/jwt";

const app = global.__APP__;

let refreshToken: string;

describe("Test Tokens", () => {
  beforeAll(async () => {
    const user = await request(app).post("/api/e-commerce/auth/signin").send({
      username: process.env.SUPER_USER_USERNAME,
      password: process.env.SUPER_USER_PASSWORD,
    });

    const cookieHeader = user.headers["set-cookie"];
    const cookies = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];

    const refreshTokenCookie = cookies.find((cookie) =>
      cookie.startsWith("refreshToken=")
    );

    refreshToken = refreshTokenCookie.split("=")[1];
  });

  test("Test refresh token endpoint", async () => {
    const response = await request(app).post("/api/e-commerce/auth/refresh-token").set("Cookie", `refreshToken=${refreshToken}`);

    expect(response.status).toBe(200);
    const cookieHeader = response.headers["set-cookie"];
    const cookies = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];

    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));

    expect(jwtCookie).not.toBeUndefined();
  });
});
