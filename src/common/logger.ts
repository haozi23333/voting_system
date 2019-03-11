/**
 * 设置日志
 */

import { configure, getLogger } from 'log4js';
import { join } from 'path';
import config from '../../config';

configure({
  appenders: {
    stdout: {
      type: 'stdout',
    },
    vs: {
      type: 'file',
      filename: join(config.log.dir, 'service.log'),
    },
  },
  categories: {
    default: {
      appenders: ['vs', 'stdout'],
      level: 'all',
    },
  },
});

const logger = getLogger('vs');

logger.level = 'all';

export default logger;
