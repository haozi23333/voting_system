/**
 * voting_system - app.js
 */
import express from 'express';

import 'colors';

import load_routers from "./routers";
import user_auth from "./middlewares/user_auth";
import error_handler from "./middlewares/error_handler";
import logger from "./common/logger";
import cors from "cors";

const app = express();
import bodyParser = require('body-parser');

const main = async () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(user_auth);

  load_routers(app);

  app.use(error_handler);
  app.listen(3000, () => {
    logger.info('[APP] 服务启动成功~ 监听在 3000 端口');
  });

  return app;
};

module.exports = main;
