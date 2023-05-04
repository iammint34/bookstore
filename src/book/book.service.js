const CoreModel = require('@core/model');
const { v4: uuidV4 } = require('uuid');
const { isSet } = require('@helpers/tool');
const { toLower } = require('lodash');

class BookService extends CoreModel {

    static async getList(filters = {}, pagination = {}, sort = {}) {

        // Set Defaults
        pagination.page = isSet(pagination.page) ? ~~pagination.page : 1;
        pagination.perPage = isSet(pagination.perPage) ? ~~pagination.perPage : 10;
        sort.field = isSet(sort.field) ? sort.field : 'createdAt';
        sort.order = isSet(sort.order) ? sort.order : 'DESC';

        let replacements = [];


        let { string: filterString, replacements: filterReplacements } = this.parseFilters(filters);
        let whereClause = `WHERE true ${filterString}`;
        replacements = [...filterReplacements];

        if (isSet(filters.search)) {
            whereClause += ` AND CONCAT_WS('|', LOWER(u.authorPseudonym), LOWER(b.title), LOWER(b.description), LOWER(b.price)) LIKE ?`
            replacements.push(`%${toLower(filters.search)}%`)
        }

        let fields = `
            u.authorPseudonym,
            b.*
        `;

        let tables = `
            book b 
            JOIN user u ON u.id = b.userId
        `;

        let queries = {};
        queries.select = `SELECT ${fields} FROM ${tables} ${whereClause} ORDER BY ${sort.field} ${sort.order}`
        queries.count = `SELECT count(*) as count FROM ${tables} ${whereClause}`

        let result = this.data_pagination(queries, replacements, pagination);
        return result
    }

    static async create(authUser = {}, payload = {}) {

        console.log(payload);
        payload.uuid = uuidV4();

        // binds authenticated user to the book
        payload.userId = authUser.id;

        // Converts/Format the price into int
        payload.price = ~~payload.price;

        return this.createOne(`book`, payload);
    }

    static async update(userId = 0, uuid = 0, payload = {}) {

        // Converts/Format the price into int
        payload.price = ~~payload.price;
        return this.updateOne(`book`, { uuid: uuid, userId: userId }, payload);
    }

    static async delete(userId = 0, uuid = 0, payload = {}) {
        return this.deleteOne(`book`, { uuid: uuid, userId: userId });
    }
    
    static async getByUuid(uuid) {
        return this.findOne(`book`, { uuid });
    }

}

module.exports = BookService
