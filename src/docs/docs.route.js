const Router = require('@core/router')
const DocumentationController = require('./docs.controller')
const ROUTER = new Router('docs', DocumentationController)

ROUTER
    .register('get', '/', 'handleGenerateHtml')
    .register('get', '/:file', 'handleServeFiles')
    .register('get', '/static/:file', 'handleServeFiles')

module.exports = ROUTER.routes