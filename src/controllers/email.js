const error_code = require('../../config/error_codes');
const HttpError = require('../common/error');
const redis = require('../services/redis');
const redis_keys = require('../../config/redis_keys');
const { User } = require('../models');

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
    throw new HttpError('缺少 token 参数', error_code.MISS_PARAMS);
  }
  const args = Buffer.from(req.query.token, 'base64').toString();
  const [user_id, virify_token] = args.split(',');

  const redis_key = redis_keys.user_register_email_key(user_id);
  const token = await redis.get(redis_key);
  const user = await User.findOne({ _id: user_id });

  if (!user) {
    throw new HttpError('无效的用户', error_code.ERROR_PARAMS);
  }
  if (user.is_register_verify === 1) {
    throw new HttpError('已经验证过邮箱了', error_code.VERIFIED_MAIL);
  }
  if (token !== virify_token) {
    throw new HttpError('无效的 token', error_code.VERIFIED_MAIL);
  } else {
    user.is_register_verify = 1;
    await user.save();
    await redis.del(redis_key);

    const user_session = await redis.get(redis_keys.user_session_key(user_id));
    if (user_session) {
      const { access_token } = JSON.parse(user_session);
      await redis.set(redis_keys.user_session_key(user_id), JSON.stringify({
        ...user,
        access_token,
      }), 'EX', 7 * 24 * 3600);
    }
    res.status(200).send({
      code: 200,
      data: {
        msg: '验证成功',
      },
    });
  }
  return next();
};
