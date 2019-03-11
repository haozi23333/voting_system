import express_promise_router from "express-promise-router";
import email_controller from "../controllers/email";

const router = express_promise_router();
router.get('/email/register_verify', email_controller.register_verify);

module.exports = router;
