import request from "supertest";

const app = global.__APP__;

let token: string;

describe("Admin Endpoints", () => {

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

    it("Get all users", async () => {
        const response = await request(app).get("/api/e-commerce/admin/users").set("Cookie", `jwt=${token}`);
        expect(response.status).toBe(200);
        expect(response.body.users).toBeDefined();
    });

    it("Get a single user", async () => {
        const response = await request(app).get("/api/e-commerce/admin/users/1").set("Cookie", `jwt=${token}`);
        expect(response.status).toBe(200);
    });
});