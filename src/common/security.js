const { createHmac, randomBytes } = require('crypto');
const config = require('../../config');
const moment = require('moment')

module.exports = {};

/**
 * 生成安全密码
 * @param str
 * @returns {Buffer | string | PromiseLike<ArrayBuffer>}
 */
module.exports.gen_cecurity_password = function (str) {
  return createHmac('md5', config.security.user_salt).update(str).digest();
};

/**
 * 生成安全的登录token
 * @param user
 * @returns {string}
 */
module.exports.gen_cecurity_access_token = function (user) {
  return [randomBytes(32).toString('hex'), user._id, moment().add(7, 'days').toDate()].join().toString('base64');
};
