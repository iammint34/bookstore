const paths = {
    '/book': {},
    '/book/{uuid}': {},
    '/book/unpublish/{uuid}': {},
}

paths['/book'].post = {
    summary: 'Create Book',
    security: [{ bearerAuth: [] }],
    tags: ['Book'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                },
                example: {
                    "title": "My First Book",
                    "description": "First book of the year.",
                    "coverImage": "https://images.freeimages.com/images/large-previews/898/sunset-1341536.jpg",
                    "price": 1250.75
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

paths['/book'].get = {
    summary: 'Get List of Book',
    tags: ['Book'],
    parameters: [
        {
            name: 'userId',
            in: 'query',
            description: 'userId of the User/Author (optional)',
            schema: { type: 'string' }
        },
        {
            name: 'authorPseudonym',
            in: 'query',
            description: 'authorPseudonym of the User/Author (optional)',
            schema: { type: 'string' }
        },
        {
            name: 'title',
            in: 'query',
            description: 'title of the Book (optional)',
            schema: { type: 'string' }
        },
        {
            name: 'description',
            in: 'query',
            description: 'description of the Book (optional)',
            schema: { type: 'string' }
        },
        {
            name: 'search',
            in: 'query',
            description: 'search detail of the book (optional)',
            schema: { type: 'string' }
        },
        {
            name: 'page',
            in: 'query',
            description: 'page of the List (Default 1)',
            schema: { type: 'string' }
        },
        {
            name: 'perPage',
            in: 'query',
            description: 'perPage of the List (Default 10)',
            schema: { type: 'string' }
        },
        {
            name: 'field',
            in: 'query',
            description: 'field to Sort (Default id)',
            schema: { type: 'string', enum: ['authorPseudonym', 'id', 'userId', 'title', 'description', 'price', 'createdAt', 'updatedAt'] }
        },
        {
            name: 'order',
            in: 'query',
            description: 'order of the Sort (Default desc)',
            schema: { type: 'string', enum: ['asc', 'desc'] }
        },
    ],
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    example: {
                        "success": true,
                        "message": "Record(s) retrieved successfully!",
                        "data": {
                            "count": 1,
                            "rows": [
                                {
                                    "authorPseudonym": "M.Sustal",
                                    "id": 13,
                                    "userId": 1,
                                    "uuid": "0d2d8e26-948d-4093-b7b7-289ceabb43d7",
                                    "title": "My First Book",
                                    "description": "First book of the year.",
                                    "coverImage": null,
                                    "price": "1250.00",
                                    "createdAt": "2023-04-29T07:53:48.000Z",
                                    "updatedAt": null
                                }
                            ],
                            "totalPages": 1
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

paths['/book/{uuid}'].get = {
    summary: 'Get Book Details by UUID',
    tags: ['Book'],
    parameters: [
        {
            name: 'uuid',
            in: 'path',
            description: 'UUID of the Book',
            schema: { type: 'string' }
        }
    ],
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    example: {
                        "success": true,
                        "message": "Record(s) retrieved successfully!",
                        "data": {
                            "id": 13,
                            "userId": 1,
                            "uuid": "0d2d8e26-948d-4093-b7b7-289ceabb43d7",
                            "title": "My First Book",
                            "description": "First book of the year.",
                            "coverImage": null,
                            "price": "1250.00",
                            "createdAt": "2023-04-29T07:53:48.000Z",
                            "updatedAt": null
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

paths['/book/{uuid}'].put = {
    summary: 'Update Book by UUID',
    security: [{ bearerAuth: [] }],
    tags: ['Book'],
    parameters: [
        {
            name: 'uuid',
            in: 'path',
            description: 'UUID of the Book',
            schema: { type: 'string' }
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                },
                example: {
                    "title": "My First Book",
                    "description": "First book of the year.",
                    "coverImage": "https://images.freeimages.com/images/large-previews/898/sunset-1341536.jpg",
                    "price": 1250.75
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

paths['/book/unpublish/{uuid}'].delete = {
    summary: 'Delete/Unpublish Book by UUID',
    security: [{ bearerAuth: [] }],
    tags: ['Book'],
    parameters: [
        {
            name: 'uuid',
            in: 'path',
            description: 'UUID of the Book',
            schema: { type: 'string' }
        }
    ],
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
                            "insertId": 0,
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