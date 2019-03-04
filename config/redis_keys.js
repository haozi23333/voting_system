/**
 * Redis 的 keys 列表
 */

const prefix = 'vs@'

const keys = {
  /**
   * Redis 中用户登录 session 的 Key 名
   * @param user_id   用户 ID
   * @returns {string}
   */
  user_session_key: (session) => `${prefix}user_session:${user_id}`,
  /**
   * 用户注册之后邮箱验证信息存储
   * @param user_id   用户 ID
   * @returns {string}
   */
  user_register_email_key: (user_id) => `${prefix}user_register_${user_id}`
}

module.exports = keys;
