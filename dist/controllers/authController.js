"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Login = exports.Register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_js_1 = require("../config/db.js");
const generateToken_js_1 = require("../utils/generateToken.js");
const Register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "A required field is missing! please confirm tour register details"
        });
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    try {
        const user = await db_js_1.prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });
        return res.status(201).json({
            message: "New User Created",
            name: user.name,
            email: user.email
        });
    }
    catch (error) {
        res.status(500).json({
            Message: "Error from the server"
        });
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            Message: "Your Login credentials are Incomplete"
        });
    }
    const userExists = await db_js_1.prisma.user.findUnique({
        where: { email: email }
    });
    if (!userExists) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, userExists.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    //Generate Token
    const token = (0, generateToken_js_1.GenerateToken)({ id: userExists.id, name: userExists.name, email: userExists.email, createdAt: userExists.createdAt }, res);
    try {
        res.status(201).json({
            Ok: true,
            Message: "User Logged In",
            user: {
                id: userExists?.id,
                name: userExists?.name,
                email: userExists?.email,
                createdAt: userExists?.createdAt
            },
            Token: token
        });
    }
    catch (error) {
        console.error("Login failed:", error);
    }
};
exports.Login = Login;
const Logout = (req, res) => {
    res.clearCookie("userJWT", { path: "/" });
    return res.json({ ok: true });
};
exports.Logout = Logout;
//# sourceMappingURL=authController.js.map