import request from "supertest";
import server from "../app/app";
import { describe, after, test } from "node:test"; // Assuming you're using `beforeAll`, `afterAll`, and `test` from `node:test`
import { initDatabase } from "../app/database/init";

describe("Server test", () => {
    beforeAll(async () => {
        initDatabase(); // Assuming initDatabase is a method of your server module
    });

    test("Server test", async () => {
        const response = await request(server).get("/");
        expect(response.status).toBe(200);
    });

    afterAll(() => {
        // Add cleanup logic here if necessary
    });
});
