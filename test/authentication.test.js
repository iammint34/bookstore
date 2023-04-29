const request = require('supertest');

describe('API — AUTHENTICATION', () => {
    //  Initiate Server connection
    const server = request('http://localhost:3000/api');

    describe('POST — Generate Token', () => {
        it('Should Respond status 201 and JWT Token', async () => {
            let payload = {
                "username": "mac.sustal",
                "password": "d3dec3f35387156495cbc21471313f87155f878f3435b693f50077c2be479033"
            }
            await server.post('/authentication')
                .send(payload)
                .then((response) => {
                    expect(response.statusCode).toBe(201)
                })
        });

        it('Should Respond status 403 on invalid User Credentials.', async () => {
            let payload = {
                "username": "demo",
                "password": "demo"
            }
            await server.post('/authentication')
                .send(payload)
                .then((response) => {
                    expect(response.statusCode).toBe(403)
                })
        });
    });

});