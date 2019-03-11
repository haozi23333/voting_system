import session_router from "./session";
import user_router from "./user";
import email_router from "./email";
import vote_router from "./vote";

module.exports = function load_routers(app) {
  /**
   * 基础健康检查
   */
  app.use('/api/ping', (req, res, next) => {
    res.status(200).send({ code: 200, timestamp: Date.now() });
    return next();
  });

  app.use('/api', session_router);
  app.use('/api', user_router);
  app.use('/api', email_router);
  app.use('/api', vote_router);
};
