const supertest = require('supertest');
const app = require('../server'); // Pfad zu Ihrer Express-App
const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});
