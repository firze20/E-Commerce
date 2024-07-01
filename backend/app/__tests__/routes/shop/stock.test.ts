import request from "supertest";

const app = global.__APP__;

let token: string;

describe("Test Stock endpoints", () => {

    beforeAll(async () => {
        const user = await request(app).post("/api/e-commerce/auth/signin").send({
          username: process.env.SUPER_USER_USERNAME,
          password: process.env.SUPER_USER_PASSWORD,
        });
    
        const cookieHeader = user.headers["set-cookie"];
        const cookies = Array.isArray(cookieHeader) ? cookieHeader : [cookieHeader];
    
        const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));
    
        if (!jwtCookie) {
          throw new Error("token cookie not found");
        }
    
        token = jwtCookie.split("=")[1];
      });

    it("Add stock to item", async () => {
        const response = await request(app).post("/api/e-commerce/manager/stock/4/add").set("Cookie", `jwt=${token}`);
        expect(response.status).toBe(200);
    });

    it("Remove stock to item", async () => {
        const response = await request(app)
            .post("/api/e-commerce/manager/stock/4/remove").set("Cookie", `jwt=${token}`)
        expect(response.status).toBe(200);
    });

});