const router = require('express-promise-router')();
const session_controller = require('../controllers/session');

router.post('/session', session_controller.create_session);
router.delete('/session', session_controller.delete_session);
router.get('/session', session_controller.get_session);

module.exports = router;
