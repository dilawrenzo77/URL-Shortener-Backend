"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const urlShortController_js_1 = require("../controllers/urlShortController.js");
const urlShortController_js_2 = require("../controllers/urlShortController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
// import { MustBeUser } from "../middleware/authMiddleware.js";
const router = (0, express_1.Router)();
router.post("/urlShortener", authMiddleware_js_1.MustBeUser, urlShortController_js_1.URLShortener);
router.get("/:shortcode", urlShortController_js_2.ShortURL);
exports.default = router;
//# sourceMappingURL=urlShort.Route.js.map