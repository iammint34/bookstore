const logger = require('@helpers/logger');
const { ValidatorError } = require('@libs/exceptions');
const { pick, isEmpty } = require('lodash');
const { isSet } = require('@helpers/tool');

module.exports = {
    createValidator: [
        async (request, response, next) => {
            try {
                let errors = [];
                
                const body = pick(request.body, ['username', 'password', 'authorPseudonym']);

                for (const key of ['username', 'password', 'authorPseudonym']) {
                    if (!isSet(body[key])) errors.push({
                        message: `${key} is required.`,
                        path: key,
                        location: `body`
                    })
                }

                if (!isEmpty(errors)) throw new ValidatorError(`Bad Request.`, errors);

                next()
            } catch (error) {
                next(error)
            }
        }
    ],

    updateValidator: [
        async (request, response, next) => {
            try {
                let errors = [];
                
                const body = pick(request.body, ['password', 'authorPseudonym']);

                for (const key of ['password', 'authorPseudonym']) {
                    if (!isSet(body[key])) errors.push({
                        message: `${key} is required.`,
                        path: key,
                        location: `body`
                    })
                }

                if (!isEmpty(errors)) throw new ValidatorError(`Bad Request.`, errors);

                next()
            } catch (error) {
                next(error)
            }
        }
    ],
}
