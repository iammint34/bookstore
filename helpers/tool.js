const { isUndefined, isNull } = require('lodash')
const crypto = require('crypto');

const sha256 = (value = '') => {
    return crypto.createHash('sha256').update(value).digest('hex');
}

const isSet = (value) => {
    return !isUndefined(value) && !isNull(value) && value != '' ? true : false;
}

module.exports = { isSet, sha256 }