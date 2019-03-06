/**
 * 用户登录 AccessToken 处理中间件
 * @returns {Promise<void>}
 */
const logger = require('../common/logger');
const error_code = require('../../config/error_codes');
const http_error = require('../common/error')

const User = require('../services/user')

module.exports = async function (req, res, next) {
  const access_token_str = req.header('access-token');
  if (access_token_str) {
    try {
      const args = Buffer.from(access_token_str, 'base64').toString().split(',');
      if (args.length === 3) {
        const [access_token, user_id] = args;
        const user = await User.login_with_access_token(user_id, access_token);
        if (user) {
          req.user = user;
          return next();
        }
      }
      throw new http_error('AccessToken 异常, 请重新登录', error_code.ACCESS_TOKEN_INVLID)
    } catch (e) {
      logger.info(`[UserAuth] ${access_token_str}  异常`);
      return res.status(400).send({
        code: error_code.ACCESS_TOKEN_INVLID,
        data: {
         msg: '异常的 AccessToekn 或已过期'
        }
      });
    }
  }
  return next();
}
