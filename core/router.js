const { Router: ExpressRouter } = require('express')
const { isArray } = require('lodash')
const ExpressValidatorMiddleware = require('@middlewares/validator-result')

class Router {
    constructor(basePath, Controller) {
        this._router = ExpressRouter()
        this._basePath = '/api/' + basePath
        this._controller = new Controller()
    }

    get routes() {
        return this._router
    }

    middlewares(middleware) {
        if (isArray(middleware)) {
            middleware.forEach(m => { this._router.use(this._basePath, m) })
        } else {
            this._router.use(this._basePath, middleware)
        }

        return this
    }

    register(method, path, controllerMethod, middlewares = []) {
        const routerPath = this._basePath + path
        const controller = this._controller[controllerMethod].bind(this._controller)

        if (!isArray(middlewares)) {
            middlewares = [middlewares]
        }

        this._router[method](routerPath, [...middlewares, ExpressValidatorMiddleware, controller])
        return this
    }
}

module.exports = Router