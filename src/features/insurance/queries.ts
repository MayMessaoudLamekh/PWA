import "server-only";
import { prisma } from "@/lib/prisma";

export function listInsurances(ownerId: string) {
  return prisma.insurance.findMany({
    where: { car: { ownerId } },
    orderBy: { endDate: "asc" },
    include: { car: { select: { id: true, brand: true, model: true, plateNumber: true } } },
  });
}
