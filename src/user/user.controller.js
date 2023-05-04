const { createdResponse, updatedResponse } = require('@core/controller');
const logger = require('@helpers/logger');
const UserService = require('./user.service');
const { pick } = require('lodash');


    const handleCreateUser = async (request, response, next) => {
        try {

            let payload = pick(request.body, ['username', 'password', 'authorPseudonym']);

            let result = await UserService.create(payload);
            return createdResponse(response, result);
        } catch (error) {
            next(error)
        }
    }

    const handleUpdateUser = async (request, response, next) => {
        try {

            let payload = pick(request.body, ['password', 'authorPseudonym']);

            const authUser = request.authUser;

            let result = await UserService.update(authUser.id, payload);
            return updatedResponse(response, result);
        } catch (error) {
            next(error)
        }
    }


module.exports = {
    handleCreateUser,
    handleUpdateUser,
}