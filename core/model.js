const mysql = require('mysql2');
const { ConnectionError } = require('@libs/exceptions');
const logger = require('@helpers/logger');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 50000, // idle connections timeout, in milliseconds
    queueLimit: 0
});
// create the connection to database
class CoreModel {

    static parseFilters(filters = {}) {
        let conditions = "";
        let replacements = [];
        for (const key in filters) {
            // exclude search
            if (key != 'search') {
                conditions += `AND ${key} = ? `;
                replacements.push(filters[key]);
            }
        }

        return { string: conditions.substring(0, conditions.length - 1), replacements: replacements };
    }

    static async execute(query = "", replacements = []) {
        return await new Promise((resolve, reject) => {
            connection.execute(query, replacements, (err, results) => {
                if (err) reject({ error: err })
                resolve(results)
            });
        });
    }

    static async rawQuery(query = "", replacements = []) {
        try {
            const res = await this.execute(query, replacements);
            return res ?? null;
        } catch (error) {
            this.parseSqlError(error);
        }
    }

    static async createOne(table = "", options = {}) {
        try {
            let columns = "", values = "";
            let replacements = [];
            for (const key in options) {
                columns += `${key},`; values += "?,";
                replacements.push(options[key]);
            }

            const res = await this.execute(`INSERT INTO ${table} (${columns.substring(0, columns.length - 1)}) VALUES (${values.substring(0, values.length - 1)})`, replacements);
            return res ?? null;
        } catch (error) {
            this.parseSqlError(error);
        }
    }

    static async updateOne(table = "", wheres = {}, options = {}) {
        try {
            let values = "";
            let conditions = "";
            let replacements = [];
            for (const key in options) {
                values += `${key} = ?,`;
                replacements.push(options[key]);
            }

            for (const key in wheres) {
                conditions += `${key} = ? AND `;
                replacements.push(wheres[key]);
            }

            const res = await this.execute(`UPDATE ${table} SET ${values.substring(0, values.length - 1)} WHERE ${conditions.substring(0, conditions.length - 4)}`, replacements);
            return res ?? null;
        } catch (error) {
            this.parseSqlError(error);
        }
    }

    static async deleteOne(table = "", wheres = {}, options = {}) {
        try {
            let values = "";
            let conditions = "";
            let replacements = [];

            for (const key in wheres) {
                conditions += `${key} = ? AND `;
                replacements.push(wheres[key]);
            }

            const res = await this.execute(`DELETE FROM ${table} WHERE ${conditions.substring(0, conditions.length - 4)}`, replacements);
            return res ?? null;
        } catch (error) {
            this.parseSqlError(error);
        }
    }

    static async findOne(table = "", options = {}) {
        try {
            let columns = "";
            let replacements = [];
            for (const key in options) {
                columns += `${key} = ? AND `;
                replacements.push(options[key]);
            }
            const res = await this.execute(`SELECT * FROM ${table} WHERE ${columns.substring(0, columns.length - 4)}`, replacements);
            return res[0] ?? null
        } catch (error) {
            this.parseSqlError(error);
        }
    }

    static async data_pagination(queries = {}, replacements = [], pagination = {}) {
        try {
            const limit = pagination.perPage ? pagination.perPage : 25
            const offset = (pagination.page > 1) ? ((pagination.page * pagination.perPage) - pagination.perPage) : 0
            pagination.page = pagination.page ? pagination.page : 1
            pagination.perPage = pagination.perPage ? pagination.perPage : 25 // DEFAULT OFFSET
            let results = {
                count: 0,
                rows: [],
                totalPages: 0
            }

            let data = {}
            data.count = await this.execute(queries.count, replacements)
            data.select = await this.execute(queries.select + `\nlimit ${offset}, ${limit}`, replacements)

            results.count = parseInt(data.count[0].count)
            results.rows = data.select
            results.totalPages = Math.ceil(parseInt(data.count[0].count) / pagination.perPage)

            return results
        } catch (error) {
            this.parseSqlError(error);
        }
    }

    static parseSqlError(error) {
        let { code, errno, sqlState, sqlMessage } = error.error;
        logger.error({ code, errno, sqlState, sqlMessage });
        throw new ConnectionError(`${sqlMessage}`);
    }

}
module.exports = CoreModel