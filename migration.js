const mysql = require('mysql2');
const logger = require('./helpers/logger')
const Config = require("dotenv").config();
const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'migrations');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 50000, // idle connections timeout, in milliseconds
    queueLimit: 0
});

const execute = async (query = "", replacements = []) => {
    try {
        return await new Promise((resolve, reject) => {
            connection.execute(query, replacements, (err, results) => {
                if (err) reject({ error: err })
                resolve(results)
            });
        });
    } catch (error) {
        let { code, errno, sqlState, sqlMessage } = error.error;
        logger.error({ code, errno, sqlState, sqlMessage });
        process.exit(1);
    }
}

const args = process.argv.slice(2);
const command = args[0] ?? null;

const runCommand = async () => {
    switch (command) {
        case 'setup_db':
            logger.info('Creating database...');
            await execute(`CREATE DATABASE IF NOT EXISTS bookstore_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
            logger.info('Creating tables...');
            await execute(`
                    CREATE TABLE IF NOT EXISTS bookstore_db.user (
                        id INT(6) UNSIGNED UNIQUE AUTO_INCREMENT PRIMARY KEY,
                        uuid VARCHAR(50) NULL DEFAULT NULL,
                        username VARCHAR(150) NULL DEFAULT NULL,
                        password VARCHAR(150) NULL DEFAULT NULL,
                        authorPseudonym VARCHAR(255) NULL DEFAULT NULL,
                        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                        UNIQUE KEY (id),
                        UNIQUE KEY (uuid),
                        UNIQUE KEY (username)
                    );
                `);
            await execute(`
                    CREATE TABLE IF NOT EXISTS bookstore_db.user_blocklist (
                        id INT(6) UNSIGNED UNIQUE AUTO_INCREMENT PRIMARY KEY,
                        userId INT(6) UNSIGNED
                    );
            `);
            await execute(`
                    CREATE TABLE IF NOT EXISTS bookstore_db.book (
                        id INT(6) UNSIGNED UNIQUE AUTO_INCREMENT PRIMARY KEY,
                        userId INT(6) UNSIGNED,
                        uuid VARCHAR(50) NULL DEFAULT NULL,
                        title VARCHAR(255) NULL DEFAULT NULL,
                        description VARCHAR(255) NULL DEFAULT NULL,
                        coverImage VARCHAR(255) NULL DEFAULT NULL,
                        price DECIMAL(9, 2) NULL DEFAULT 0.00,
                        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                        updatedAt DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                        UNIQUE KEY (id),
                        UNIQUE KEY (uuid)
                    );
                `);
            logger.log('Done...');
            process.exit(1);
            break;

        case `migrate`:
            fs.readdir(directoryPath, async (err, files) => {
                for (const file of files) {
                    const data = fs.readFileSync(`${directoryPath}/${file}`, 'utf8');
                    logger.info(`Executing SQL script from ${file}...`);
                    await execute(data);
                }
                process.exit(1);
            });
            break;

        case 'remove_db':
            logger.info('Removing Database...');
            await execute(`DROP DATABASE bookstore_db;`);
            logger.log('Done...');
            process.exit(1);
            break;

        default: process.exit(1); break;
    }
}

runCommand();