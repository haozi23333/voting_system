const router = require('express-promise-router')();
const vote_controller = require('../controllers/vote');

router.get('/votes', vote_controller.query_all);
router.post('/vote', vote_controller.create_vote);
router.get('/vote/:id', vote_controller.find_one_with_id);
router.put('/vote/:id', vote_controller.update_vote);
router.post('/vote/:id/ticket', vote_controller.create_ticket);
router.put('/vote/:id/ticket', vote_controller.update_ticket);

module.exports = router;
