const Joi = require('joi');
const user = require('../services/user');
const error_code = require('../../config/error_codes');
const http_error = require('../common/error')

module.exports = {};


/**
 * 登录
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.create_user = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  }).required();

  const { error, value } = Joi.validate(req.body, schema);

  if (error) {
    throw new http_error(error, error_code.MISS_PARAMS);
  }
  const { email, password, username } = value;

  await user.register(username, email, password)
  res.status(200).send({
    code: 200,
    data: {
      msg: '注册成功'
    }
  })
  await next();
};
