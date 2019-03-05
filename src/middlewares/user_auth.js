/**
 * 用户登录 AccessToken 处理中间件
 * @returns {Promise<void>}
 */
const logger = require('../common/logger');
const error_code = require('../../config/error_codes');
const User = require('../services/user')

module.exports = function (req, res, next) {
  const access_token_str = req.header('access-token');
  if (access_token_str) {
    try {
      const args = Buffer.from(access_token_str, 'base64').toString().split(',');
      if (args.length !== 3) {
        throw new Error();
      }
      const [access_token, user_id] = args;
      const user = User.login_with_access_token(user_id, access_token);
      if (user) {
        throw new Error();
      }
      req.user = user;
    } catch (e) {
      logger.info(`[UserAuth] ${access_token_str}  格式有问题`);
      return req.status(401).send({
        code: error_code.ACCESS_TOKEN_INVLID,
      });
    }
  }
  return next();
}
