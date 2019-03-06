const router = require('express-promise-router')();
const vote_controller = require('../controllers/vote');

router.post('/vote', vote_controller.create_vote);
router.get('/vote/:id', vote_controller.find_one_with_id);
router.get('/votes', vote_controller.query_all);

module.exports = router;
