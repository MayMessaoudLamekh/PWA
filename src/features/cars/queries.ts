import "server-only";
import { isObjectId } from "@/lib/object-id";
import { prisma } from "@/lib/prisma";

// Every query is scoped to the owner — a user can never read someone else's car.

export function listCars(ownerId: string) {
  return prisma.car.findMany({
    where: { ownerId },
    orderBy: { createdAt: "desc" },
    include: {
      reminders: { where: { done: false } },
      _count: { select: { fuelLogs: true, maintenances: true, trips: true } },
    },
  });
}

export async function getCar(ownerId: string, carId: string) {
  if (!isObjectId(carId)) return null;
  return prisma.car.findFirst({
    where: { id: carId, ownerId },
    include: {
      fuelLogs: { orderBy: { date: "desc" } },
      maintenances: { orderBy: { date: "desc" }, include: { garage: { select: { id: true, name: true } } } },
      trips: { orderBy: { date: "desc" } },
      reminders: { orderBy: [{ done: "asc" }, { dueDate: "asc" }] },
      insurances: { orderBy: { endDate: "desc" } },
    },
  });
}

export type CarWithDetails = NonNullable<Awaited<ReturnType<typeof getCar>>>;

/** Small list for <select> inputs in other modules (insurance, complaints). */
export function listCarOptions(ownerId: string) {
  return prisma.car
    .findMany({ where: { ownerId }, select: { id: true, brand: true, model: true, plateNumber: true } })
    .then((cars) => cars.map((c) => ({ value: c.id, label: `${c.brand} ${c.model} (${c.plateNumber})` })));
}

/** All cars with the history needed for dashboard stats. */
export function listCarsWithHistory(ownerId: string) {
  return prisma.car.findMany({
    where: { ownerId },
    include: { fuelLogs: true, maintenances: true, insurances: true, reminders: true },
  });
}
