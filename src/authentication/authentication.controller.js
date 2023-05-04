const { tokenResponse, retrievedResponse, createdResponse, updatedResponse, deletedResponse } = require('@core/controller');
const logger = require('@helpers/logger');
const AuthenticationService = require('./authentication.service');
const { pick } = require('lodash');


const handleAuthenticate = async (request, response, next) => {
    try {

        const { username, password } = pick(request.body, ['username', 'password']);

        const token = await AuthenticationService.getToken(username, password);
        return tokenResponse(response, token);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleAuthenticate
}