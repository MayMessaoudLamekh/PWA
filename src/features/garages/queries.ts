import "server-only";
import { prisma } from "@/lib/prisma";

export function listGarages(search?: string) {
  const q = search?.trim();
  return prisma.garage.findMany({
    where: q ? { OR: [{ name: { contains: q } }, { city: { contains: q } }, { services: { contains: q } }] } : undefined,
    orderBy: { name: "asc" },
    include: { _count: { select: { maintenances: true, complaints: true } } },
  });
}

export function getGarage(id: string) {
  return prisma.garage.findUnique({
    where: { id },
    include: { _count: { select: { maintenances: true, complaints: true } } },
  });
}

/** For <select> inputs in other modules (maintenance, complaints). */
export function listGarageOptions() {
  return prisma.garage
    .findMany({ select: { id: true, name: true, city: true }, orderBy: { name: "asc" } })
    .then((gs) => gs.map((g) => ({ value: g.id, label: `${g.name} — ${g.city}` })));
}
