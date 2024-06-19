import request from "supertest";
import RefreshToken from "../../../database/models/RefreshToken";
import User from "../../../database/models/User";
import { generateRefreshToken } from "../../../utils/jwt";

const app = global.__APP__;

let refreshToken: string;

describe("Test Tokens", () => {
  beforeAll(async () => {
    try {
      
      const user = await request(app).post("/api/e-commerce/auth/signin").send({
        username: process.env.SUPER_USER_USERNAME,
        password: process.env.SUPER_USER_PASSWORD,
      });

      const cookieHeader = user.headers["set-cookie"];
      const cookies = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];

      const refreshTokenCookie = cookies.find((cookie) =>
        cookie.startsWith("refreshToken=")
      );

      if (!refreshTokenCookie) {
        throw new Error("Refresh token cookie not found");
      }

      refreshToken = refreshTokenCookie.split("=")[1];
    } catch (error) {
      console.error("Error in beforeAll hook:", error);
      throw error;
    }
  });

  test("Test refresh token endpoint", async () => {
    const response = await request(app)
      .post("/api/e-commerce/auth/refresh-token")
      .set("Cookie", `refreshToken=${refreshToken}`);

    expect(response.status).toBe(200);

    const cookieHeader = response.headers["set-cookie"];
    const cookies = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];

    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));

    expect(jwtCookie).not.toBeUndefined();
  });

  test("Test refesh token endpoint without a token", async () => {
    const response = await request(app).post("/api/e-commerce/auth/refresh-token");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("No refresh token provided.");
  });

  test("Invalid refresh token", async () => {

    const refreshToken = "213010a0dal21lladald"

    const response = await request(app).post("/api/e-commerce/auth/refresh-token").set("Cookie", `refreshToken=${refreshToken}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid refresh token.");
  });

  test("Refresh token that doesnt exist in the database", async () => {
    const user = await User.findOne();

    const refreshToken = generateRefreshToken(user!, "1d");

    const response = await request(app).post("/api/e-commerce/auth/refresh-token").set("Cookie", `refreshToken=${refreshToken}`);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Refresh token not found.");
  })

  test("Test expired refresh token", async () => {
      // Get 1 user
      const user = await User.findOne();
      
      const refreshToken = generateRefreshToken(user!, "1s");

      await RefreshToken.create({
        token: refreshToken,
        userId: user!.id,
        expirityDate: Number(Date.now() - 1000)
      });

      const response = await request(app).post("/api/e-commerce/auth/refresh-token").set("Cookie", `refreshToken=${refreshToken}`);

      expect(response.status).toBe(401);
      })
});