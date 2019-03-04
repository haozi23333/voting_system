const { Schema, model, Types } = require('mongoose')

const ticket_schema = new Schema({
  /**
   * 用户 ID
   */
  user_id: { type: Types.ObjectId },
  /**
   * 结果列表
   */
  values: { type: [Number] },
  /**
   * 创建记录时间
   */
  created_at: { type: Date, default: Date.now },
  /**
   * 最后更新时间
   */
  update_at: { type: Date, default: Date.now },
});

// 自动更新时间
ticket_schema.pre('save', (next) => {
  this.update_at = Date.now();
  next()
});

model('Ticket', ticket_schema);
