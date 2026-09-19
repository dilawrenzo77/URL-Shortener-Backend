import 'dotenv/config';
declare const prisma: import("../generated/prisma/internal/class.js").PrismaClient<any, import("../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined, import("@prisma/client/runtime/client").DefaultArgs>;
declare const connectDB: () => Promise<void>;
declare const disconnectDB: () => Promise<void>;
export { prisma, connectDB, disconnectDB };
