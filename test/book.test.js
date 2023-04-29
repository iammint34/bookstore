const request = require('supertest');

describe('API — BOOK', () => {
    //  Initiate Server connection
    const server = request('http://localhost:3000/api');

    describe('POST — Create Book', () => {
        it('Should Respond status 201 on creating Book for User: mac.sustal', async () => {
            await server.post('/authentication')
                .send({
                    "username": "mac.sustal",
                    "password": "d3dec3f35387156495cbc21471313f87155f878f3435b693f50077c2be479033"
                })
                .then(async (response) => {
                    await server.post('/book')
                        .set('Authorization', `Bearer ${response.body.data.accessToken}`)
                        .send({
                            "title": "Jest Supertest",
                            "description": "API Test using Jest and Supertest",
                            "coverImage": "https://images.freeimages.com/images/large-previews/898/sunset-1341536.jpg",
                            "price": 1.00
                        })
                        .then((response) => {
                            expect(response.statusCode).toBe(201)
                        })
                })
        });

        it('Should Respond status 400 on missing required fields.', async () => {
            await server.post('/authentication')
                .send({
                    "username": "mac.sustal",
                    "password": "d3dec3f35387156495cbc21471313f87155f878f3435b693f50077c2be479033"
                })
                .then(async (response) => {
                    await server.post('/book')
                        .set('Authorization', `Bearer ${response.body.data.accessToken}`)
                        .send({
                            "coverImage": "https://images.freeimages.com/images/large-previews/898/sunset-1341536.jpg",
                            "price": 1.00
                        })
                        .then((response) => {
                            expect(response.statusCode).toBe(400)
                        })
                })
        });
    });

    describe('GET — Get Book', () => {
        it('Should Respond status 200 on Get List', async () => {
            await server.get('/book')
                .then((response) => {
                    expect(response.statusCode).toBe(200)
                })
        });

        it('Should Respond status 200 on Get by UUID', async () => {
            await server.get('/book')
                .then((response) => {
                    server.get(`/book/${response.body.data.rows[0].uuid}`)
                        .then((response) => {
                            expect(response.statusCode).toBe(200)
                        })
                })
        });
    });

    describe('PUT — Update Book by UUID', () => {
        it('Should Respond status 200 on Update by UUID', async () => {
            await server.get('/book')
                .then((response) => {
                    let bookUuid = response.body.data.rows[0].uuid;
                    server.post('/authentication')
                        .send({
                            "username": "mac.sustal",
                            "password": "d3dec3f35387156495cbc21471313f87155f878f3435b693f50077c2be479033"
                        })
                        .then((response) => {
                            server.put(`/book/${bookUuid}`)
                                .set('Authorization', `Bearer ${response.body.data.accessToken}`)
                                .send({
                                    "title": "Jest Supertest UPDATED",
                                    "description": "API Test using Jest and Supertest UPDATED",
                                    "coverImage": "https://images.freeimages.com/images/large-previews/898/sunset-1341536.jpg",
                                    "price": 1.00
                                })
                                .then((response) => {
                                    expect(response.statusCode).toBe(200)
                                })
                        })
                })
        });
    });

    describe('DELETE — Delete Book by UUID', () => {
        it('Should Respond status 200 on Delete by UUID', async () => {
            await server.get('/book')
                .then((response) => {
                    let bookUuid = response.body.data.rows[0].uuid;
                    server.post('/authentication')
                        .send({
                            "username": "mac.sustal",
                            "password": "d3dec3f35387156495cbc21471313f87155f878f3435b693f50077c2be479033"
                        })
                        .then((response) => {
                            server.delete(`/book/unpublish/${bookUuid}`)
                                .set('Authorization', `Bearer ${response.body.data.accessToken}`)
                                .then((response) => {
                                    expect(response.statusCode).toBe(200)
                                })
                        })
                })
        });
    });

});