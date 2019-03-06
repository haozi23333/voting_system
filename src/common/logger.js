/**
 * 设置日志
 */

const log4js = require('log4js');
const path = require('path');
const config = require('../../config');

log4js.configure({
  appenders: {
    stdout: {
      type: 'stdout',
    },
    vs: {
      type: 'file',
      filename: path.join(config.log.dir, 'service.log'),
    },
  },
  categories: {
    default: {
      appenders: ['vs', 'stdout'],
      level: 'all',
    },
  },
});

const logger = log4js.getLogger('vs');

logger.level = 'all';

module.exports = logger;
