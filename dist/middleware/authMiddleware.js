"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustBeUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_js_1 = require("../config/db.js");
const MustBeUser = async (req, res, next) => {
    let token;
    const jwtSecret = process.env.JWT_SECRET;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies?.userJWT) {
        token = req.cookies?.userJWT;
    }
    if (!token) {
        // return res.status(401).json({ message: "Not authorized, no token" });
        return next();
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = await db_js_1.prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });
        if (!user) {
            return res.status(401).json({ message: "User no longer exists" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("MustBeUser error:", error);
        return res.status(401).json({ message: "Not authorized" });
    }
};
exports.MustBeUser = MustBeUser;
//# sourceMappingURL=authMiddleware.js.map