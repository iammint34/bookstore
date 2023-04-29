const Router = require('@core/router');
const BookController = require('./book.controller');
const ROUTER = new Router('book', BookController);
const { requestMethod } = require('@helpers/constant');
const { preventUserValidator, createValidator, updateValidator, getListValidator } = require('./book.validator');
const AuthorizationMiddleware = require('@middlewares/authorization');

ROUTER
    .register(requestMethod.GET, '/', 'handleGetList', [getListValidator])
    .register(requestMethod.GET, '/:uuid', 'handleGetbyUuid')
    .register(requestMethod.POST, '/', 'handleCreateBook', [AuthorizationMiddleware, preventUserValidator, createValidator])
    .register(requestMethod.PUT, '/:uuid', 'handleUpdateBook', [AuthorizationMiddleware, preventUserValidator, updateValidator])
    .register(requestMethod.DELETE, '/unpublish/:uuid', 'handleDeleteBook', [AuthorizationMiddleware, preventUserValidator])

module.exports = ROUTER.routes

