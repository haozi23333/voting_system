/**
 * 通用错误处理
 * @returns {Promise<void>}
 */
import logger from '../common/logger';
import error_code from '../../config/error_codes';
import HttpError from '../common/error';
import config from '../../config';

module.exports = async function error_handler(err, req, res, next) {
  let error = err;
  if (error.name === 'ValidationError') {
    error = new HttpError(error, error_code.MISS_PARAMS);
  }

  if (error instanceof HttpError) {
    logger.error('[ERROR_HADLER] 出现错误 错误码', error.code, error.error, req.headers, req.body);
    if (error.code === error_code.MISS_PARAMS) {
      error.status = 400;
    }
    return res.status(error.status).send({
      code: error.code,
      data: {
        ...error.data,
        msg: error.error,
      },
    });
  }
  logger.error('[ERROR_HADLER] 出现错误', error, req.header, req.body);
  res.status(500).send({
    code: error_code.UNCAUGHT_ERROR,
    data: {
      msg: config.env !== 'production' ? error : '出现未知异常',
    },
  });
  return next();
};
