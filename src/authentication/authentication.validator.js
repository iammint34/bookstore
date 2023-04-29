const logger = require('@helpers/logger');
const { ValidatorError } = require('@libs/exceptions');
const { isSet } = require('@helpers/tool');
const { pick, isEmpty } = require('lodash');

module.exports = {
    authenticationValidator: [
        async (request, response, next) => {
            try {
                let errors = [];

                const body = pick(request.body, ['username', 'password']);

                for (const key of ['username', 'password']) {
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
    ]
}
