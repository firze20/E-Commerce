import request from "supertest";


describe("Test Initial Server", () => {

    test('Should be status 200!', async () => {
        const response = await request(global.app).get("/api/e-commerce");
        expect(response.status).toBe(200);
    })

    test('Should be "Welcome to E-Commerce API!"', async () => {
        const expectedMessage = 'Welcome to E-Commerce API!';
        const response = await request(global.app).get("/api/e-commerce");
        expect(response.body).toEqual({ message: expectedMessage });
    })
});



