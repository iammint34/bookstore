const BaseController = require('@core/controller');
const logger = require('@helpers/logger');
const AuthenticationService = require('./authentication.service');
const { pick } = require('lodash');

class AuthenticationController extends BaseController {

    async handleAuthenticate(request, response, next) {
        try {

            const { username, password } = pick(request.body, ['username', 'password']);

            const token = await AuthenticationService.getToken(username, password);
            return this.tokenResponse(response, token);
        } catch (error) {
            next(error)
        }
    }

}

module.exports = AuthenticationController