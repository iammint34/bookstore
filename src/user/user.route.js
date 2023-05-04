const createRouter = require('@core/router');
const UserController = require('./user.controller');
const { requestMethod } = require('@helpers/constant');
const { createValidator, updateValidator } = require('./user.validator');
const AuthorizationMiddleware = require('@middlewares/authorization');

const router = createRouter('user', UserController);

router.register(requestMethod.POST, '/', 'handleCreateUser', [createValidator]);
router.register(requestMethod.PUT, '/', 'handleUpdateUser', [AuthorizationMiddleware, updateValidator]);

module.exports = router.routes

