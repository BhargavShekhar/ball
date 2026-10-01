import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createPrismaClient() {
    const connectionString = `${process.env.DATABASE_URL}`;
    
    if (!connectionString) throw new Error("Could not read database url from env");
    
    const adapter = new PrismaPg({ connectionString });
    const prisma = new PrismaClient({ adapter });

    return prisma;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}