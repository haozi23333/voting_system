import express_promise_router from "express-promise-router";
import vote_controller from "../controllers/vote";

const router = express_promise_router();
router.get('/votes', vote_controller.query_all);
router.post('/vote', vote_controller.create_vote);
router.get('/vote/:id', vote_controller.find_one_with_id);
router.put('/vote/:id', vote_controller.find_one_with_id);
router.post('/vote/:id/ticket', vote_controller.create_ticket);

module.exports = router;
