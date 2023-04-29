const Router = require('@core/router');
const AuthenticationController = require('./authentication.controller');
const ROUTER = new Router('authentication', AuthenticationController);
const { requestMethod } = require('@helpers/constant');
const { authenticationValidator } = require('./authentication.validator');

ROUTER
    .register(requestMethod.POST, '/', 'handleAuthenticate', [authenticationValidator])

module.exports = ROUTER.routes

