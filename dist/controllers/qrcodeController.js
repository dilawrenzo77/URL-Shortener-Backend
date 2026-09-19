"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveQrcodeController = exports.QrcodeController = void 0;
const bwip_js_1 = __importDefault(require("bwip-js"));
const db_js_1 = require("../config/db.js");
const QrcodeController = async (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ message: 'data is required' });
    }
    try {
        const png = await bwip_js_1.default.toBuffer({
            bcid: 'qrcode',
            text: String(data),
            scale: 3,
        });
        const buffer = Buffer.isBuffer(png) ? png : Buffer.from(png);
        return res.status(200).json({
            message: 'QRCODE successfully created',
            image: `data:image/png;base64,${buffer.toString('base64')}`,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error generating QRCODE' });
    }
};
exports.QrcodeController = QrcodeController;
const SaveQrcodeController = async (req, res) => {
    const { url, userId, image } = req.body;
    if (!url || !userId || !image) {
        return res.status(400).json({
            Messsage: "Missing Credentials"
        });
    }
    const userExists = await db_js_1.prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    try {
        if (userId && userExists) {
            const savedQr = await db_js_1.prisma.qr.create({
                data: {
                    url: url,
                    userId: userId,
                    image: image
                }
            });
            return res.status(201).json({
                message: "Qr Saved",
                savedQr
            });
        }
    }
    catch (error) {
    }
};
exports.SaveQrcodeController = SaveQrcodeController;
//# sourceMappingURL=qrcodeController.js.map