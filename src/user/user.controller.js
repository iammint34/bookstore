const BaseController = require('@core/controller');
const logger = require('@helpers/logger');
const UserService = require('./user.service');
const { pick } = require('lodash');

class UserController extends BaseController {

    async handleCreateUser(request, response, next) {
        try {

            let payload = pick(request.body, ['username', 'password', 'authorPseudonym']);

            let result = await UserService.create(payload);
            return this.createdResponse(response, result);
        } catch (error) {
            next(error)
        }
    }

    async handleUpdateUser(request, response, next) {
        try {

            let payload = pick(request.body, ['password', 'authorPseudonym']);

            const authUser = request.authUser;

            let result = await UserService.update(authUser.id, payload);
            return this.updatedResponse(response, result);
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController