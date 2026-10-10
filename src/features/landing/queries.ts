import "server-only";
import { prisma } from "@/lib/prisma";

/** Live numbers shown in the stats band. */
export async function getLandingStats() {
  const [drivers, cars, garages, services] = await Promise.all([
    prisma.user.count(),
    prisma.car.count(),
    prisma.garage.count(),
    prisma.maintenance.count(),
  ]);
  return { drivers, cars, garages, services };
}

export function getFeaturedGarages(take = 3) {
  return prisma.garage.findMany({
    take,
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, city: true, address: true, services: true },
  });
}
