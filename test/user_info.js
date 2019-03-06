const crypto = require('crypto');

module.exports = {
  username: crypto.randomBytes(15).toString('hex'),
  password: crypto.randomBytes(15).toString('hex'),
  email: `${crypto.randomBytes(8).toString('hex')}@haozi.moe`,
};
