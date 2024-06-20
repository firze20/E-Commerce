import request from "supertest";

const app = global.__APP__;

describe("Test Stock endpoints", () => {
    it("Get all stock items", async () => {
        const response = await request(app).get("/api/e-commerce/stock");
        expect(response.status).toBe(200);
        expect(response.body.stock).toBeDefined();
    });

    it("Get the stock quantity of a single item", async () => {
        const response = await request(app).get("/api/e-commerce/stock/1");
        expect(response.status).toBe(200);
        expect(response.body.stock).toBeDefined();
    });

    it("Update item stock by adding quantity to an item", async () => {
        const response = await request(app)
            .put("/api/e-commerce/stock/1")
            .send({
                quantity: 10
            });
        expect(response.status).toBe(200);
        expect(response.body.stock).toBeDefined();
    });

    it("Update item stock by removing quantity to an item", async () => {
        const response = await request(app)
            .put("/api/e-commerce/stock/1")
            .send({
                quantity: -10
            });
        expect(response.status).toBe(200);
        expect(response.body.stock).toBeDefined();
    });
});