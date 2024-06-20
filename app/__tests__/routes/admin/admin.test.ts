import request from "supertest";

const app = global.__APP__;

describe("Admin Endpoints", () => {
    it("Get all users", async () => {
        const response = await request(app).get("/api/e-commerce/admin/users");
        expect(response.status).toBe(200);
        expect(response.body.users).toBeDefined();
    });

    it("Get a single user", async () => {
        const response = await request(app).get("/api/e-commerce/admin/users/1");
        expect(response.status).toBe(200);
        expect(response.body.user).toBeDefined();
    });

    it("Remove a user", async () => {
        const response = await request(app).delete("/api/e-commerce/admin/users/3");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User removed successfully");
    })
});