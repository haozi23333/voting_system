/**
 * voting_system - app.js
 */
require('colors');
const app = require('express')();
const logger = require('./common/logger');

const bodyParser = require('body-parser')
const error_handler = require('./middlewares/error_handler')
const user_auth = require('./middlewares/user_auth')

const load_routers = require('./routers')

const main = async () => {
  app.use(bodyParser.json())
  app.use(user_auth);

  load_routers(app);

  app.use(error_handler);
  app.listen(3000, () => {
    logger.info('[APP] 服务启动成功~ 监听在 3000 端口')
  })
};

main().then(res => logger.info(res)).catch(err => logger.error(err));
