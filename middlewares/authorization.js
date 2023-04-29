const { AuthenticationError } = require('@libs/exceptions')
const AuthenticationService = require('../src/authentication/authentication.service');
const UserService = require('../src/user/user.service');
const { isSet } = require('@helpers/tool');
const { split } = require('lodash');

module.exports = async (request, response, next) => {
    try {
        const { authorization } = request.headers;
        if (!isSet(authorization)) throw new AuthenticationError("Missing authorization");

        // Validate Authorization Value
        const authToken = split(authorization, ' ');
        const token = authToken[1];
        if (!isSet(token)) throw new AuthenticationError("Missing authorization token");

        let authData = await AuthenticationService.verifyToken(token);

        let user = await UserService.getUser({ id: authData?.user?.id });
        if (!isSet(user)) throw new AuthenticationError(`You don't have any user record.`);
        
        request.authUser = authData.user;

        next();
    } catch (error) {
        next(error)
    }
}