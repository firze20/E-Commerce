import request from "supertest";
import createServer from "../../app/utils/server";

const app = createServer();

describe("Test Initial Server", () => {
    test('Should be status 200!', async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
    })

    test('Should be "Welcome to E-Commerce API!"', async () => {
        const expectedMessage = 'Welcome to E-Commerce API!';
        const response = await request(app).get("/");
        expect(response.body).toEqual({ message: expectedMessage });
    })
});



