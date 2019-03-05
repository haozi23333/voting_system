const joi = require('joi');
const user = require('../services/user');
const error_code = require('../../config/error_codes');

module.exports = {};


/**
 * 登录
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.create_session = async (req, res, next) => {
  const schema = joi.object().keys({
    email: joi.string().email({ minDomainAtoms: 2 }).required(),
    password: joi.string().required(),
  });

  const { error, value } = joi.validate(req.body, schema);

  if (error) {
    throw error;
  }
  const { email, password } = value;
  res.send(await user.login(email, password));
  await next();
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
    throw Error(error_code.NOT_LOGGED_IN);
  }
  await user.logout(req.user._id);
  return next();
};


module.exports.get_session = async (req, res, next) => {
  if (!req.user) {
    throw Error(error_code.NOT_LOGGED_IN);
  }
  await user.get_session(req.user._id);
}
