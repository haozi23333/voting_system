const { createHmac, randomBytes } = require('crypto');
const moment = require('moment');
const config = require('../../config');

module.exports = {};

/**
 * 生成安全密码
 * @param str
 * @returns {Buffer | string | PromiseLike<ArrayBuffer>}
 */
module.exports.gen_cecurity_password = str => createHmac('md5', config.security.user_salt).update(str).digest().toString('hex');

/**
 * 生成安全的登录token
 * @param user
 * @returns {*[]}
 */
module.exports.gen_cecurity_access_token = user => [randomBytes(32).toString('hex'), user._id, moment().add(7, 'days').toDate()];
