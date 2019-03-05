const { randomBytes } = require('crypto');
const { User } = require('../models');
const { send_register_mail } = require('./email');
const redis = require('./redis');
const redis_keys = require('../../config/redis_keys');
const error_code = require('../../config/error_codes');

const security = require('../common/security');

module.exports = {};

/**
 * 注册账户
 * @param username
 * @param password
 * @param email
 * @returns {Promise<void>}
 */
module.exports.register = async (username, password, email) => {
  const salt = randomBytes(8).toString('hex');
  const secure_password = security.gen_cecurity_password(password + salt);

  if (await User.findOne({ email })) {
    throw new Error(error_code.REGISTER_EMAIL_EXISTS);
  }
  const user = new User({
    username,
    password: secure_password,
    email,
    salt,
  });

  await user.save();
  await send_register_mail(user);

  return {};
};

/**
 * 登录
 * @param key
 * @param password
 * @returns {Promise<void>}
 */
module.exports.login = async (email, password) => {
  const user = await User.findOne({
    email,
  });

  if (user.password !== security.gen_cecurity_password(password + user.salt)) {
    throw new Error(error_code.LOGIN_FAILD_PASSWORD_ERROR);
  }

  const access_token = security.gen_cecurity_access_token(user);
  const res = {
    _id: user._id,
    email: user.email,
    access_token,
  };

  await redis.set(redis_keys.user_session_key(user), JSON.stringify(res), 'EX', 7 * 60 * 60 * 24 * 1000);

  return res;
};

/**
 * 用 AccessToken 登陆
 * @param user_id
 * @param access_token
 * @returns {Promise<*>}
 */
module.exports.login_with_access_token = async (user_id, access_token) => {
  const user_str = await redis.get(redis_keys.user_session_key(user_id));
  if (!user_str) {
    return null;
  }

  const user = JSON.parse(user_str);
  if (user.access_token !== access_token) {
    return null;
  }
  return user;
};

/**
 * 登出
 * @param user_id
 * @returns {Promise<*>}
 */
module.exports.logout = async user_id => redis.del(redis_keys.user_session_key(user_id));

/**
 * 获取session
 * @param user_id
 * @returns {Promise<*>}
 */
module.exports.get_session = async user_id => redis.get(redis_keys.user_session_key(user_id));
