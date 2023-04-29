const { validationResult } = require('express-validator')
const { ValidatorError } = require('@libs/exceptions')

module.exports = (request, response, next) => {
    const errors = validationResult(request)

    if(!errors.isEmpty()) {
        throw new ValidatorError('Bad Request', errors.array())
    } else {
        next()
    }
}