import { createHmac, randomBytes } from 'crypto';
import config from '../../config';
import * as moment from "moment";

module.exports = {};

/**
 * 生成安全密码
 * @param str
 * @returns {Buffer | string | PromiseLike<ArrayBuffer>}
 */
export const gen_cecurity_password = str => createHmac('md5', config.security.user_salt).update(str).digest().toString('hex');

/**
 * 生成安全的登录token
 * @param user
 * @returns {*[]}
 */
export const gen_cecurity_access_token = user => [randomBytes(32).toString('hex'), user._id, moment().add(7, 'days').toDate()];
