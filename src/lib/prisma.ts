import "server-only";
import { PrismaClient } from "@prisma/client";

// Re-use a single client in dev (Next.js hot-reload would otherwise open
// a new MongoDB connection pool on every file change).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
