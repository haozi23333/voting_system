const router = require('express-promise-router')();
const email_controller = require('../controllers/email');

router.get('/register_verify', email_controller.register_verify);

module.exports = router;
