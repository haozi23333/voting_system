const { User } = require('../models');
const { randomBytes, createHmac } = require('crypto')
const config = require('../../config')
const security = require('../common/security')

module.exports = {}

/**
 * 注册账户
 * @param username
 * @param password
 * @param email
 * @returns {Promise<void>}
 */
module.exports.register = async (username, password, email) => {

  const salt = randomBytes(8).toString('hex')
  const secure_password = security.gen_cecurity_password(password + salt);

  const user = new User({
    username,
    password: secure_password,
    email,
    salt
  });

  await user.save()
  // TODO 这里要发一下邮件
}

/**
 * 登录
 * @param key
 * @param password
 * @returns {Promise<void>}
 */
module.exports.login = async (email, password) => {
  const user = await User.findOne({
    email
  })

  if (user.password === security.gen_cecurity_password(password + user.salt)) {
    // TODO 创建 Session
  }
}
