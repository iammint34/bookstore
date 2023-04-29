const Router = require('@core/router');
const UserController = require('./user.controller');
const ROUTER = new Router('user', UserController);
const { requestMethod } = require('@helpers/constant');
const { createValidator, updateValidator } = require('./user.validator');
const AuthorizationMiddleware = require('@middlewares/authorization');

ROUTER
    .register(requestMethod.POST, '/', 'handleCreateUser', [createValidator])
    .register(requestMethod.PUT, '/', 'handleUpdateUser', [AuthorizationMiddleware, updateValidator])

module.exports = ROUTER.routes

