const jwt = require('jsonwebtoken');
const UserService = require('../user/user.service');
const { sha256, isSet } = require('@helpers/tool');
const logger = require('@helpers/logger');
const { AuthenticationError } = require('@libs/exceptions');

class AuthenticationService {

    static async getToken(username = '', password = '') {
        let user = await UserService.getUser({ username, password });

        if (!isSet(user)) throw new AuthenticationError(`You don't have any user record.`);

        // remove password key from user object
        delete user.password; 
        
        // generate token using user model
        return this.generateToken({
            user
        });
    }

    static async generateToken(data = {}) {
        return jwt.sign(data, process.env.SERVICE_SECRET, { expiresIn: '1h' });
    }

    static async verifyToken(token = '') {
        return jwt.verify(token, process.env.SERVICE_SECRET);
    }

}

module.exports = AuthenticationService
