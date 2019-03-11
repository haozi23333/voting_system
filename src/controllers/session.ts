import Joi from "joi";
import * as UserService from "../services/user";
import error_code from "../../config/error_codes";
import HttpError from "../common/error";


/**
 * 登录
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
export const create_session = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
  }).required();

  const { error, value } = Joi.validate(req.body, schema);

  if (error) {
    throw new HttpError('错误参数', error_code.MISS_PARAMS, null, 401);
  }
  const { email, password } = value;
  res.status(200).send({
    code: 200,
    data: await UserService.login(email, password),
  });
  return next();
};


/**
 * 登出
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
export const delete_session = async (req, res, next) => {
  if (!req.user) {
    throw new HttpError('未登录, 无权限', error_code.NOT_LOGGED_IN, null, 401);
  }
  await UserService.logout(req.user._id);

  res.status(200).send({
    code: 200,
    data: {
      msg: '登出成功',
    },
  });
  return next();
};

/**
 * 返回当前登录的用户信息
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
export const get_session = async (req, res, next) => {
  if (!req.user) {
    throw new HttpError('未登录, 无权限', error_code.NOT_LOGGED_IN, null, 401);
  }
  await UserService.get_session(req.user._id);
  return next();
};
