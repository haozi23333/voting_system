const { Schema, model, Types } = require('mongoose');

const vote_schema = new Schema({
  /**
   * 投票名字
   */
  name: { type: String },
  /**
   * 候选人列表
   */
  candidate: [String],
  /**
   * 开始时间
   */
  start_time: { type: Date },
  /**
   * 结束时间
   */
  end_time: { type: Date },
  /**
   * 创建者
   */
  create_by: { type: Types.ObjectId, ref: 'User' },
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
vote_schema.index({ name: 1 });
vote_schema.index({ created_at: 1 });
vote_schema.index({ create_by: 1 });

// 自动更新时间
vote_schema.pre('save', (next) => {
  this.update_at = Date.now();
  next();
});

model('Vote', vote_schema);
