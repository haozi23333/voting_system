const error_code = require('../../config/error_codes');
const http_error = require('../common/error');
const redis = require('../services/redis')
const redis_keys = require('../../config/redis_keys')
const { User } = require('../models')
module.exports = {};

/**
 * 邮件验证
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.register_verify = async (req, res, next) => {
  if (!req.query && !req.query.token) {
    throw new http_error({}, error_code.MISS_PARAMS)
  }
  const args = Buffer.from(req.query.token, 'base64').toString();
  const [user_id, virify_token] = args.split(',')

  const redis_key = redis_keys.user_register_email_key(user_id);
  const token = await redis.get(redis_key);
  const user = await User.findOne({ _id: user_id });

  if (user.is_register_verify === 1) {
    throw new http_error('已经验证过邮箱了', error_code.VERIFIED_MAIL)
  }
  if (token !== virify_token) {
    throw new http_error('无效的 token', error_code.VERIFIED_MAIL)
  } else {
    user.is_register_verify = 1;
    await user.save();
    await redis.del(redis_key);

    const user_session = await redis.get(redis_keys.user_session_key(user_id));
    if (user_session) {
      const { access_token } = JSON.parse(user_session);
      await red.set(redis_keys.user_session_key(user_id), JSON.stringify({
        ...user,
        access_token
      }), 'EX', 7 * 24 * 3600)
    }
  }

};
