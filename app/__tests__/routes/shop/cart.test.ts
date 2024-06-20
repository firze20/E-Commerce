import request from "supertest";

const app = global.__APP__;

describe("Test Cart endpoints", () => {
    test("Get the state of my cart", async () => {
        const response = await request(app).get("/api/e-commerce/shop/cart");
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
            .delete("/api/e-commerce/shop/cart/1");
        expect(response.status).toBe(200);
        expect(response.body.cart).toBeDefined();
    });

    test("Update an item in my cart", async () => {
        const response = await request(app)
            .put("/api/e-commerce/shop/cart/1")
            .send({
                quantity: 2
            });
        expect(response.status).toBe(200);
        expect(response.body.cart).toBeDefined();
    });
});