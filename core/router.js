const { Router: ExpressRouter } = require('express')
const { isArray } = require('lodash')
const ExpressValidatorMiddleware = require('@middlewares/validator-result')

const createRouter = (basePath, controller) => {
  const router = ExpressRouter()
  basePath = '/api/' + basePath

  const middlewares = middleware => {
    isArray(middleware)
      ? middleware.forEach(m => router.use(basePath, m))
      : router.use(basePath, middleware)

    return { middlewares }
  }

  const register = (method, path, controllerMethod, middlewares = []) => {
    const routerPath = basePath + path
    const controllerFn = controller[controllerMethod].bind(controller)
    const middlewareList = isArray(middlewares) ? middlewares : [middlewares]

    router[method](routerPath, [
      ...middlewareList,
      ExpressValidatorMiddleware,
      controllerFn,
    ])

    return { routes: router, middlewares }
  }

  return { routes: router, middlewares, register }
}

module.exports = createRouter
