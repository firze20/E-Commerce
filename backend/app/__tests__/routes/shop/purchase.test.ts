import request from 'supertest';

const app = global.__APP__;

let token: string;

describe("Test Purchase endpoints", () => {

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

    it("Add item to cart and make a purchase!", async () => {
        //

       const addCart = await request(app)
        .post("/api/e-commerce/store/my-cart/1")
        .set("Cookie", `jwt=${token}`)
        .send({
          quantity: 1,
        });

        expect(addCart.status).toBe(200);

        const response = await request(app)
            .post("/api/e-commerce/store/purchase").set("Cookie", `jwt=${token}`)
        expect(response.status).toBe(201);
        expect(response.body.message).toBeDefined();
    });
});