const request = require('supertest');

describe('API — USER', () => {
    //  Initiate Server connection
    const server = request('http://localhost:3000/api');

    describe('POST — Create User', () => {
        it('Should Respond status 201 on creating 1st User - mac.sustal', async () => {
            let payload = {
                "username": "mac.sustal",
                "password": "Pass1234",
                "authorPseudonym": "M.Sustal"
            }
            await server.post('/user')
                .send(payload)
                .then((response) => {
                    expect(response.statusCode).toBe(201)
                })
        });

        it('Should Respond status 201 on creating 2nd User - Darth Vader', async () => {
            let payload = {
                "username": "Darth Vader",
                "password": "Pass1234",
                "authorPseudonym": "Darth Vader"
            }
            await server.post('/user')
                .send(payload)
                .then((response) => {
                    expect(response.statusCode).toBe(201)
                })
        });

        it('Should Respond status 400 on missing required fields.', async () => {
            let payload = {
                "username": "mac.sustal",
                "password": "Pass1234"
            }
            await server.post('/user')
                .send(payload)
                .then((response) => {
                    expect(response.statusCode).toBe(400)
                })
        });

        it('Should Respond status 500 on existing User.', async () => {
            let payload = {
                "username": "mac.sustal",
                "password": "Pass1234",
                "authorPseudonym": "M.Sustal"
            }
            await server.post('/user')
                .send(payload)
                .then((response) => {
                    expect(response.statusCode).toBe(500)
                })
        });
    });

    describe('POST — Update User', () => {
        it('Should Respond status 403 on Missing Authorization.', async () => {
            let payload = {
                "username": "mac.sustal",
                "password": "Pass1234",
                "authorPseudonym": "M.Sustal"
            }
            await server.put('/user')
                .send(payload)
                .then((response) => {
                    expect(response.statusCode).toBe(403)
                })
        });

        it('Should Respond status 200 on user update', async () => {
            await server.post('/authentication')
                .send({
                    "username": "mac.sustal",
                    "password": "d3dec3f35387156495cbc21471313f87155f878f3435b693f50077c2be479033"
                })
                .then(async (response) => {
                    await server.put('/user')
                        .set('Authorization', `Bearer ${response.body.data.accessToken}`)
                        .send({
                            "password": "Pass1234",
                            "authorPseudonym": "M.Sustal"
                        })
                        .then((response) => {
                            expect(response.statusCode).toBe(200)
                        })
                })
        });


    });

});