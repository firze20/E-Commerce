import request from "supertest";

const app = global.__APP__;

let token: string;

describe("Test Cart endpoints", () => {
  beforeAll(async () => {
    try {
      const user = await request(app).post("/api/e-commerce/auth/signin").send({
        username: process.env.SUPER_USER_USERNAME,
        password: process.env.SUPER_USER_PASSWORD,
      });

      const cookieHeader = user.headers["set-cookie"];
      const cookies = Array.isArray(cookieHeader)
        ? cookieHeader
        : [cookieHeader];

      const refreshTokenCookie = cookies.find((cookie) =>
        cookie.startsWith("jwt=")
      );

      if (!refreshTokenCookie) {
        throw new Error("Refresh token cookie not found");
      }

      token = refreshTokenCookie.split("=")[1];
    } catch (error) {
      console.error("Error in beforeAll hook:", error);
      throw error;
    }
  });

  test("Get the state of my cart", async () => {
    const response = await request(app)
      .get("/api/e-commerce/store/my-cart")
      .set("Cookie", `jwt=${token}`);
    expect(response.status).toBe(200);
    expect(response.body.cart).toBeDefined();
    expect(response.body.totalItems).toBeDefined();
    expect(response.body.totalPrice).toBeDefined();
  });

  test("Add an item to my cart, updating it and then removing it ", async () => {
    const addingResponse = await request(app)
      .post("/api/e-commerce/store/my-cart/1")
      .set("Cookie", `jwt=${token}`)
      .send({
        quantity: 1,
      });
    expect(addingResponse.status).toBe(200);
    expect(addingResponse.body.message).toBeDefined();

    const updatingResponse = await request(app)
      .put("/api/e-commerce/store/my-cart/1")
      .set("Cookie", `jwt=${token}`)
      .send({
        quantity: 2,
      });

    expect(updatingResponse.status).toBe(200);
    expect(updatingResponse.body.message).toBeDefined();

    const removingResponse = await request(app)
      .delete("/api/e-commerce/store/my-cart/1")
      .set("Cookie", `jwt=${token}`);

    expect(removingResponse.status).toBe(200);
    expect(removingResponse.body.message).toBeDefined();
  });

  test("Empty the whole cart", async () => {
    const response = await request(app)
      .delete("/api/e-commerce/store/my-cart")
      .set("Cookie", `jwt=${token}`);

    expect(response.status).toBe(200);
  });
});
