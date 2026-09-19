"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = exports.prisma = void 0;
const client_js_1 = require("../generated/prisma/client.js");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
require("dotenv/config");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_js_1.PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
}); // Type assertion to bypass the error
exports.prisma = prisma;
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DATABASE connected via prisma");
    }
    catch (error) {
        console.log(`Error connecting to our DATAbase: ${error}`);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    await prisma.$disconnect();
    await pool.end();
};
exports.disconnectDB = disconnectDB;
//# sourceMappingURL=db.js.map