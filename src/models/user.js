const { Schema, model } = require('mongoose');

const user_schema = new Schema({
  /**
   * 用户名
   */
  username: { type: String },
  /**
   * 用户密码
   */
  password: { type: String },
  /**
   * 用户安全 Salt
   */
  salt: { type: String },
  /**
   * 用户邮箱
   */
  email: { type: String },
  /**
   * 是否邮箱已经验证了
   */
  is_register_verify: {
    type: Number,
    default: 0,
  },
  /**
   * 创建时间
   */
  created_at: { type: Date, default: Date.now },
  /**
   * 最后更新时间
   */
  update_at: { type: Date, default: Date.now },
});

// 创建索引
user_schema.index({ email: 1 }, { unique: true });

// 自动更新时间
user_schema.pre('save', (next) => {
  this.update_at = Date.now();
  next();
});

model('User', user_schema);
