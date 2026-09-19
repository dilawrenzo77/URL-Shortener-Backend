"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const qrcodeController_js_1 = require("../controllers/qrcodeController.js");
const router = (0, express_1.Router)();
router.post("/generateQRCcode", qrcodeController_js_1.QrcodeController);
router.post("/saveQrCode", qrcodeController_js_1.SaveQrcodeController);
exports.default = router;
//# sourceMappingURL=qrCode.Route.js.map