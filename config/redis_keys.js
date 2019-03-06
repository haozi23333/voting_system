/**
 * Redis 的 keys 列表
 */

const prefix = 'vs@';

const keys = {
  /**
   * Redis 中用户登录 session 的 Key 名
   * @param user_id   用户 ID
   * @returns {string}
   */
  user_session_key: user_id => `${prefix}user_session:${user_id}`,
  /**
   * 用户注册之后邮箱验证信息存储
   * @param user_id   用户 ID
   * @returns {string}
   */
  user_register_email_key: user_id => `${prefix}user_register_${user_id}`,

  /**
   * 投票计数器
   * @param vote_id
   * @returns {string}
   */
  vote_count_key: vote_id => `${prefix}vote_counter:${vote_id}`,
};

module.exports = keys;
