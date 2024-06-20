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
          const cookies = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];
    
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
        }});

    
    test("Get the state of my cart", async () => {
        const response = await request(app).get("/api/e-commerce/my-cart")
            .set("Cookie", `jwt=${token}`);
        expect(response.status).toBe(200);
        expect(response.body.cart).toBeDefined();
    });

    test("Add an item to my cart", async () => {
        const response = await request(app)
            .post("/api/e-commerce/shop/cart")
            .send({
                itemId: 1,
                quantity: 1
            });
        expect(response.status).toBe(201);
        expect(response.body.cart).toBeDefined();
    });

    test("Remove an item from my cart", async () => {
        const response = await request(app)
            .delete("/api/e-commerce/my-cart/?itemId=1");
        expect(response.status).toBe(200);
        expect(response.body.cart).toBeDefined();
    });

    test("Update an item in my cart", async () => {
        const response = await request(app)
            .put("/api/e-commerce/shop/cart/?itemId=1")
            .send({
                quantity: 2
            });
        expect(response.status).toBe(200);
        expect(response.body.cart).toBeDefined();
    });
});