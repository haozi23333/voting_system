import express_promise_router from "express-promise-router";
import { create_user } from "../controllers/user";

const router = express_promise_router();
router.post('/user', create_user);

module.exports = router;
