/**
 * 默认错误对象
 * @param error  错误实体
 * @param code   错误码
 * @param data   返回的数据
 * @param status  http Code
 */

// export default function HttpError(error, code, data = { }, status = 500) {
//   this.error = error;
//   this.code = code;
//   this.data = data;
//   this.status = status;
// };
export default class HttpError extends Error {

  public error ;
  public code ;
  public data ;
  public status ;

  constructor(error: Error | string, code = 200, data = {}, status = 500) {
    super(typeof error === 'string' ? error : error.message);
    this.error = error;
    this.code = code;
    this.data = data;
    this.status = status;
  }
}
