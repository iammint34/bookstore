const createRouter = require('@core/router');
const AuthenticationController = require('./authentication.controller');
const { requestMethod } = require('@helpers/constant');
const { authenticationValidator } = require('./authentication.validator');

const router = createRouter('authentication', AuthenticationController)
router.register(requestMethod.POST, '/', 'handleAuthenticate', [authenticationValidator])

module.exports = router.routes;
