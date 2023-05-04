const createRouter = require('@core/router')
const BookController = require('./book.controller')
const { requestMethod } = require('@helpers/constant')
const { preventUserValidator, createValidator, updateValidator, getListValidator } = require('./book.validator')
const AuthorizationMiddleware = require('@middlewares/authorization')

const router = createRouter('book', BookController)

router.register(requestMethod.GET, '/', 'handleGetList', [getListValidator]);
router.register(requestMethod.GET, '/:uuid', 'handleGetbyUuid');
router.register(requestMethod.POST, '/', 'handleCreateBook', [AuthorizationMiddleware, preventUserValidator, createValidator]);
router.register(requestMethod.PUT, '/:uuid', 'handleUpdateBook', [AuthorizationMiddleware, preventUserValidator, updateValidator]);
router.register(requestMethod.DELETE, '/unpublish/:uuid', 'handleDeleteBook', [AuthorizationMiddleware, preventUserValidator]);

module.exports = router.routes
