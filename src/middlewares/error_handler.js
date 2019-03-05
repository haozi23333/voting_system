/**
 * 通用错误处理
 * @returns {Promise<void>}
 */
const logger = require('../common/logger');
const error_code = require('../../config/error_codes');

module.exports = function error_handler(req, res, next) {
  try {
    return next();
  } catch (e) {
    logger.error('[ERROR_HADLER] 出现错误', e, req.header, req.body);
    return res.status(500).send({
      code: error_code.UNCAUGHT_ERROR,
    });
  }
}
