const paths = {
    '/user': {},
}

paths['/user'].post = {
    summary: 'Create User',
    tags: ['User'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                },
                example: {
                    "username": "string",
                    "password": "string",
                    "authorPseudonym": "string"
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
                        "message": "Record(s) created successfully!",
                        "data": {
                            "fieldCount": 0,
                            "affectedRows": 1,
                            "insertId": 2,
                            "info": "",
                            "serverStatus": 2,
                            "warningStatus": 0
                        }
                    }
                }
            }
        },
        500: {
            description: "Failed",
            content: {
                "application/json": {
                    example: {
                        "success": false,
                        "error": "ConnectionError",
                        "message": "message"
                    }
                }
            }
        }
    }
}

paths['/user'].put = {
    summary: 'Update User By Authenticated User',
    security: [{ bearerAuth: [] }],
    tags: ['User'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                },
                example: {
                    "password": "string",
                    "authorPseudonym": "string"
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
                        "message": "Record(s) created successfully!",
                        "data": {
                            "fieldCount": 0,
                            "affectedRows": 1,
                            "insertId": 2,
                            "info": "",
                            "serverStatus": 2,
                            "warningStatus": 0
                        }
                    }
                }
            }
        },
        500: {
            description: "Failed",
            content: {
                "application/json": {
                    example: {
                        "success": false,
                        "error": "ConnectionError",
                        "message": "message"
                    }
                }
            }
        }
    }
}


module.exports = paths