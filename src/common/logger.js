/**
 * 设置日志
 */

const log4js = require('log4js');
const path = require('path');
const config = require('../../config');

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: path.join(config.log.dir, 'service.log'), category: 'service' },
  ],
});

const logger = log4js.getLogger('service');

logger.level = config.debug && config.env !== 'test' ? 'DEBUG' : 'ERROR';

module.exports = logger;
