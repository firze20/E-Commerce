import request from 'supertest';

const app = global.__APP__;

describe('Unknown Endpoints', () => {
    it('should return "Unknown route" message for unknown endpoints', async () => {
        const response = await request(app).get('/api/e-commerce/unknown-endpoint');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Unknown route!');
    });
});