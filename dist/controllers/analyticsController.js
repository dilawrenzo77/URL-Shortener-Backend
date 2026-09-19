"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytics = void 0;
const db_js_1 = require("../config/db.js");
const Analytics = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({
            message: "Credentials needed"
        });
    }
    const analytics = await db_js_1.prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            url: true,
            qr: true,
        },
        omit: {
            password: true
        }
    });
    return res.status(200).json({
        Message: "User Analytics",
        analytics
    });
};
exports.Analytics = Analytics;
//# sourceMappingURL=analyticsController.js.map