const session_router = require('./session')
const user_router = require('./user')
const email_router = require('./email')
const vote_router = require('./vote')

module.exports = function load_routers(app) {
  app.use('/', session_router);
  app.use('/', user_router);
  app.use('/', email_router);
  app.use('/', vote_router);
}
