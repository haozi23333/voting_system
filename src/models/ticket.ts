import {model, Schema, Document, Types} from "mongoose";

interface Tikc {
  
}

const ticket_schema = new Schema({
  /**
   * 用户 ID
   */
  user_id: { type: String },
  /**
   * 投票ID
   */
  vote_id: { type: String },
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

// 创建索引
ticket_schema.index({ user_id: 1 });
ticket_schema.index({ vote_id: 1 });
ticket_schema.index({ vote_id: 1, user_id: 1 });
ticket_schema.index({ vote_id: 1, values: 1 });

// 自动更新时间
ticket_schema.pre('save', (next) => {
  this.update_at = Date.now();
  next();
});

model('Ticket', ticket_schema);
