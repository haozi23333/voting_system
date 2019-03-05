const router = require('express-promise-router')();
const user_controller = require('../controllers/user');

router.post('/', user_controller.create_session)
router.del('/', user_controller.delete_session)
router.get('/', )
module.exports = router;
