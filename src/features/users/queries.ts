import "server-only";
import { prisma } from "@/lib/prisma";

export function listUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { cars: true, complaints: true } },
    },
  });
}
