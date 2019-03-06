const router = require('express-promise-router')();
const user_controller = require('../controllers/user');

router.post('/user', user_controller.create_user);

module.exports = router;
