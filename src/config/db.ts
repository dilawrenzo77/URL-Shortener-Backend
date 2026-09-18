import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter, 
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
} as any); // Type assertion to bypass the error

const connectDB = async () =>{
    try {
        await prisma.$connect();
        console.log("DATABASE connected via prisma");
    } catch (error) {
        console.log(`Error connecting to our DATAbase: ${error}`);
        process.exit(1);
    }
}


const disconnectDB = async () => {
    await prisma.$disconnect();
    await pool.end();
}


export { prisma, connectDB, disconnectDB};