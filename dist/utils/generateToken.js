"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const GenerateToken = (user, res) => {
    const payload = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
    const jwtSecret = process.env.JWT_SECRET || "jwtSecret";
    const jwtExpiresIn = process.env.JWT_EXPIRE_IN;
    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, {
        expiresIn: jwtExpiresIn || '24h',
    });
    res.cookie("userJWT", token, {
        httpOnly: true,
        secure: true, // ← hardcode it, not based on NODE_ENV
        sameSite: "none",
        path: "/",
        maxAge: (1000 * 60 * 60 * 24) * 7
    });
    return token;
};
exports.GenerateToken = GenerateToken;
//# sourceMappingURL=generateToken.js.map