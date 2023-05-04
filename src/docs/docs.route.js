const createRouter = require('@core/router');
const DocumentationController = require('./docs.controller')

const router = createRouter('docs', DocumentationController);
router.register('get', '/', 'handleGenerateHtml');
router.register('get', '/:file', 'handleServeFiles');
router.register('get', '/static/:file', 'handleServeFiles');

module.exports = router.routes