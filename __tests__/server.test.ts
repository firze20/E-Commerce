import request from "supertest";

import server from "../app/server";
import { describe } from "node:test";


describe("Server test", () => {
    test("Server test", async () => {
        const response = await request(server).get("/");
        expect(response.status).toBe(200);
    });
})