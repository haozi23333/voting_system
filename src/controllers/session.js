const Joi = require('joi');
const user = require('../services/user');
const error_code = require('../../config/error_codes');
const HttpError = require('../common/error');

module.exports = {};


/**
 * 登录
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.create_session = async (req, res, next) => {
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
    data: await user.login(email, password),
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
module.exports.delete_session = async (req, res, next) => {
  if (!req.user) {
    throw new HttpError('未登录, 无权限', error_code.NOT_LOGGED_IN, null, 401);
  }
  await user.logout(req.user._id);

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
module.exports.get_session = async (req, res, next) => {
  if (!req.user) {
    throw Error(error_code.NOT_LOGGED_IN);
  }
  await user.get_session(req.user._id);
  return next();
};
