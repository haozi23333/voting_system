import mongoose from "mongoose";
import config from "../../config";
import logger from "../common/logger";
import user from "./user";
import vote from "./vote";
import ticket from "./ticket";

mongoose.connect(config.database.mongo.url, {
  poolSize: 20,
  useCreateIndex: true,
  useNewUrlParser: true,
}, (err) => {
  if (err) {
    logger.error('[Database] 连接 Mongo 服务器失败 地址 %s ', config.database.mongo.url, err.message);
    process.exit(1);
  }
  logger.info('[Database] 连接 Mongo 服务器成功');
});

export default {
  User: mongoose.model('User'),
  Vote: mongoose.model('Vote'),
  Ticket: mongoose.model('Ticket'),
};
