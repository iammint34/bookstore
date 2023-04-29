const logger = require('@helpers/logger');
const { ValidatorError } = require('@libs/exceptions');
const { pick, isEmpty, difference } = require('lodash');
const { isSet } = require('@helpers/tool');
const UserService = require('../user/user.service');

module.exports = {
    createValidator: [
        async (request, response, next) => {
            try {
                let errors = [];

                const body = pick(request.body, ['title', 'description', 'price']);

                for (const key of ['title', 'description', 'price']) {
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

    preventUserValidator: [
        async (request, response, next) => {
            try {
                let errors = [];
                const authUser = request.authUser;
                let blockList = await UserService.getBlockedUser(authUser.id);

                if (blockList.length > 0) errors.push({
                    message: `You are restricted to publish book.`,
                    path: ``,
                    location: ``
                });

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

                const body = pick(request.body, ['title', 'description', 'price']);

                for (const key of ['title', 'description', 'price']) {
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

    getListValidator: [
        async (request, response, next) => {
            try {
                let errors = [];

                const validQueries = ['userId', 'authorPseudonym', 'title', 'description', 'page', 'perPage', 'field', 'order', 'search'];
                let invalidQueries = difference(Object.keys(request.query), validQueries);

                if (invalidQueries.length > 0)
                    invalidQueries.map(key => errors.push({
                        message: `Invalid query (${key}).`,
                        path: key,
                        location: `query`
                    }))

                if (!isEmpty(errors)) throw new ValidatorError(`Bad Request.`, errors);

                next()
            } catch (error) {
                next(error)
            }
        }
    ],
}
