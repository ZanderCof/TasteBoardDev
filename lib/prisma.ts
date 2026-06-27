// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // ➕ Passiamo esplicitamente la stringa per Prisma 7 in runtime
    datasourceUrl: process.env.DATABASE_URL, 
    log: ['query', 'info', 'warn', 'error'], 
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;