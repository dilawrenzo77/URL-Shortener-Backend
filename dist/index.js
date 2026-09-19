"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const urlShort_Route_js_1 = __importDefault(require("./routes/urlShort.Route.js"));
const auth_Route_js_1 = __importDefault(require("./routes/auth.Route.js"));
const qrCode_Route_js_1 = __importDefault(require("./routes/qrCode.Route.js"));
const analytics_Route_js_1 = __importDefault(require("./routes/analytics.Route.js"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const db_js_1 = require("./config/db.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, dotenv_1.config)();
(0, db_js_1.connectDB)();
const app = (0, express_1.default)();
const port = process.env.PORT;
const frontendUrl = process.env.FRONTEND_URL;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: frontendUrl,
    credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_Route_js_1.default);
app.use("/url", urlShort_Route_js_1.default);
app.use("/qr", qrCode_Route_js_1.default);
app.use("/", analytics_Route_js_1.default);
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log("✅ TypeScript is working!");
});
//handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.error("unhandled rejection", err);
    server.close(async () => {
        await (0, db_js_1.disconnectDB)();
        process.exit(1);
    });
});
//handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("uncaughtException", err);
    await (0, db_js_1.disconnectDB)();
    process.exit(1);
});
//graceful shutdown
process.on("SIGTERM", (err) => {
    console.error("SIGTERM recieved, shutting down gracefully", err);
    server.close(async () => {
        await (0, db_js_1.disconnectDB)();
        process.exit(1);
    });
});
//# sourceMappingURL=index.js.map