const config = require('../../config')

module.exports = {}

module.exports.gen_cecurity_password = function (str) {
  const secure_password = createHmac('md5', config.security.user_salt).update(str).digest();
}
