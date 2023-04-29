const { isObject, isArray } = require('lodash');
const moment = require('moment-timezone');
const fs = require('fs');

const error = (log) => {
    if (isObject(log) || isArray(log)) log = JSON.stringify(log, null, 2);
    console.log("\x1b[31m", `[${moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')}]: ${log}`, "\x1b[0m");
}

const info = (log) => {
    if (isObject(log) || isArray(log)) log = JSON.stringify(log, null, 2);
    console.log("\x1b[36m", `[${moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')}]: ${log}`, "\x1b[0m");
}

const warning = (log) => {
    if (isObject(log) || isArray(log)) log = JSON.stringify(log, null, 2);
    console.log("\x1b[33m", `[${moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')}]: ${log}`, "\x1b[0m");
}

const debug = (log) => {
    if (isObject(log) || isArray(log)) log = JSON.stringify(log, null, 2);
    console.log("\x1b[35m", `[${moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')}]: ${log}`, "\x1b[0m");
}

const log = (log) => {
    if (isObject(log) || isArray(log)) log = JSON.stringify(log, null, 2);
    console.log("\x1b[32m", `[${moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')}]: ${log}`, "\x1b[0m");
}

const logAsFile = (filename, log, moduleName = '') => {
    const PATH = process.env.LOG_PATH ?? ''
    let stringLog = `[${moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')}] | ${moduleName} | ${log} \n`
    return fs.appendFileSync(`${PATH}/${moment().tz('Asia/Shanghai').format('YYYYMMDD')}-${filename}.txt`, stringLog);
}

module.exports = { error, info, warning, debug, log, logAsFile }