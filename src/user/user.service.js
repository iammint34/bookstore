const CoreModel = require('@core/model');
const { v4: uuidV4 } = require('uuid');
const { sha256 } = require('@helpers/tool');
const { lowerCase } = require('lodash');

class UserService extends CoreModel {

    static async getUser(filter = {}) {
        return this.findOne(`user`, filter);
    }

    static async getBlockedUser(userId = 0) {
        let query = `
            SELECT 
            u.* 
            FROM user u
            JOIN user_blocklist ub ON u.id = ub.userId
            WHERE u.id = ?
        `;

        return this.rawQuery(query, [userId]);
    }

    static async create(payload = {}) {

        payload.uuid = uuidV4();
        // Hash Password into sha256
        payload.password = sha256(payload.password);
        return this.createOne(`user`, payload);
    }

    static async update(userId = 0, payload = {}) {
        // Hash Password into sha256
        payload.password = sha256(payload.password);
        return this.updateOne(`user`, { id: userId }, payload);
    }


}

module.exports = UserService
