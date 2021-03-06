/**
 * 用户登录 AccessToken 处理中间件
 * @returns {Promise<void>}
 */
import logger from "../common/logger";
import error_code from "../../config/error_codes";
import HttpError from "../common/error";
import * as User  from "../services/user";

export default async function user_auth(req, res, next) {
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
      throw new HttpError('AccessToken 异常, 请重新登录', error_code.ACCESS_TOKEN_INVLID);
    } catch (e) {
      logger.info(`[UserAuth] ${access_token_str}  异常`);
      return res.status(400).send({
        code: error_code.ACCESS_TOKEN_INVLID,
        data: {
          msg: '异常的 AccessToekn 或已过期',
        },
      });
    }
  }
  return next();
};
