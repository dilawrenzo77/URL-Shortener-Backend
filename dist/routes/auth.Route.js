"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_js_1 = require("../controllers/authController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = (0, express_1.Router)();
router.post("/register", authController_js_1.Register);
router.post("/login", authController_js_1.Login);
router.get("/logout", authMiddleware_js_1.MustBeUser, authController_js_1.Logout);
exports.default = router;
//# sourceMappingURL=auth.Route.js.map