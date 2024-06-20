import request from 'supertest';

const app = global.__APP__;

describe("Test Purchase endpoints", () => {
    it("Get all my purchases", async () => {
        const response = await request(app).get("/api/e-commerce/shop/purchase");
        expect(response.status).toBe(200);
        expect(response.body.purchases).toBeDefined();
    });

    it("Make a purchase", async () => {
        const response = await request(app)
            .post("/api/e-commerce/shop/purchase")
            .send({
                cartId: 1
            });
        expect(response.status).toBe(201);
        expect(response.body.purchase).toBeDefined();
    });
});