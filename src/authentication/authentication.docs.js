const paths = {
    '/authentication': {},
}
paths['/authentication'].post = {
    summary: 'User Authentication',
    tags: ['Authentication'],
    requestBody: {
        
        content: {
            'application/json': {
                schema: {
                    type: 'string'
                },
                example: {
                    "username": "string",
                    "password": "string"
                }
            }
        }
    },
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    example: {
                        "success": true,
                        "message": "User authenticated successfully!",
                        "data": {
                            "tokenType": "Bearer",
                            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1dWlkIjoiNGU1MjRmZWMtOWZhOC00OGI0LTljYTEtYjE4MzRkM2Y0MjM2IiwidXNlcm5hbWUiOiJtYWMuc3VzdGFsIiwiYXV0aG9yUHNldWRvbnltIjoiTS5TdXN0YWwiLCJjcmVhdGVkQXQiOiIyMDIzLTA0LTI5VDA3OjI0OjE0LjAwMFoiLCJ1cGRhdGVkQXQiOm51bGx9LCJpYXQiOjE2ODI3NTM5MTMsImV4cCI6MTY4Mjc1NzUxM30.JIdeEUKDokCjn_59LHJguiTi6hVqoXTS6WAuAdXYhmU"
                        }
                    }
                }
            }
        },
        403: {
            description: "Failed",
            content: {
                "application/json": {
                    example: {
                        "success": false,
                        "error": "AuthenticationError",
                        "message": "message"
                    }
                }
            }
        }
    }
}


module.exports = paths