/**
 * 通用错误处理
 * @returns {Promise<void>}
 */
const logger = require('../common/logger');
const error_code = require('../../config/error_codes');
const http_error = require('../common/error')
const config = require('../../config')

module.exports = async function error_handler(error, req, res, next) {
  if (error.name === 'ValidationError') {
    error = new http_error(error, error_code.MISS_PARAMS)
  }

  if (error instanceof http_error) {
    logger.error('[ERROR_HADLER] 出现错误 错误码', error.code, error.error, req.headers, req.body);
    if (error.code === error_code.MISS_PARAMS) {
      error.status = 400
    }
    return res.status(error.status).send({
      code: error.code,
      data: {
        ...error.data,
        msg: error.error
      }
    });
  }
  logger.error('[ERROR_HADLER] 出现错误', error, req.header, req.body);
  return res.status(500).send({
    code: error_code.UNCAUGHT_ERROR,
    data: {
      msg: config.env !== 'production' ? error : '出现未知异常'
    }
  });
}
