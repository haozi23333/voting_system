/**
 * 处理连接 redis
 */

const IoRedis = require('ioredis');
const logger = require('../common/logger');
const config = require('../../config');

const clinet = new IoRedis(config.cache.redis.url);

clinet.on('error', (err) => {
  if (err) {
    logger.error('[Redis] 无法连接到 redis 服务器, 请检查 redis 配置文件', err);
    process.exit(1);
  }
});

clinet.on('connect', () => {
  logger.info('[Redis] 连接 redis server 成功');
});

module.exports = clinet;
