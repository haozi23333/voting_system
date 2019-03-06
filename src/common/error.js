/**
 * 默认错误对象
 * @param error  错误实体
 * @param code   错误码
 * @param data   返回的数据
 * @param status  http Code
 */
module.exports = function error(error, code, data = { }, status = 500) {
  this.error = error;
  this.code = code;
  this.data = data;
  this.status = status;
}
