module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: `Bookstore API`,
            description: "placeholder for description",
            termsOfService: "placeholder for terms of services",
            version: "1.0.0",
        },
        security: [{ JWT: [] }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                }
            },
        },
        servers: [{ url: process.env.SERVICE_URL }],
        paths: {
            ...require('../src/authentication/authentication.docs'),
            ...require('../src/user/user.docs'),
            ...require('../src/book/book.docs'),
        }
    },
    apis: []
}