const mongoose = require('mongoose');
const config = require('../../config');
const logger = require('../common/logger');

mongoose.connect(config.database.mongo.url, {
  poolSize: 20,
  useCreateIndex: true,
  useNewUrlParser: true
}, (err) => {
  if (err) {
    logger.error('[Database] 连接 Mongo 服务器失败 地址 %s ', config.database.mongo.url, err.message);
    process.exit(1);
  }
})

require('./user')
require('./vote')
require('./ticket')

module.exports = {
  User: mongoose.model('User'),
  Vote: mongoose.model('Vote'),
  Ticket: mongoose.model('Ticket'),
}
