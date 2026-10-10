// Demo data so every teammate starts with the same realistic dataset.
// Run with: npm run db:seed   (wipes existing data first)

import "dotenv/config";
import { randomBytes, scryptSync } from "node:crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Same format as src/lib/password.ts
function hash(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);
const daysFromNow = (n: number) => daysAgo(-n);

async function main() {
  // Order matters because of foreign keys.
  await prisma.complaint.deleteMany();
  await prisma.insurance.deleteMany();
  await prisma.reminder.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.maintenance.deleteMany();
  await prisma.fuelLog.deleteMany();
  await prisma.car.deleteMany();
  await prisma.garage.deleteMany();
  await prisma.user.deleteMany();

  // ---- Users
  await prisma.user.create({
    data: { name: "Admin", email: "admin@smartcar.test", passwordHash: hash("admin123"), role: "ADMIN" },
  });
  const driver = await prisma.user.create({
    data: { name: "Yassine Driver", email: "driver@smartcar.test", passwordHash: hash("driver123"), phone: "0600000000" },
  });

  // ---- Garages
  const [garageA, garageB] = await Promise.all([
    prisma.garage.create({
      data: {
        name: "Garage Atlas",
        address: "12 Bd Zerktouni",
        city: "Casablanca",
        phone: "0522000000",
        services: "Oil change, Tires, Brakes",
        latitude: 33.5899,
        longitude: -7.6327,
      },
    }),
    prisma.garage.create({
      data: {
        name: "Auto Service Agdal",
        address: "5 Av. de France",
        city: "Rabat",
        phone: "0537000000",
        services: "Inspection, Battery, Filters",
        latitude: 34.0,
        longitude: -6.85,
      },
    }),
  ]);

  // ---- Car with ~6 months of history (~45 km/day)
  const car = await prisma.car.create({
    data: { brand: "Dacia", model: "Logan", year: 2019, plateNumber: "12345-A-6", fuelType: "DIESEL", mileage: 87_600, ownerId: driver.id },
  });

  const fuelLogs = Array.from({ length: 12 }, (_, i) => {
    const liters = 38 + (i % 4) * 1.5;
    const pricePerLiter = 11.5 + (i % 3) * 0.3;
    return {
      carId: car.id,
      date: daysAgo(180 - i * 15),
      mileage: 79_500 + i * 680,
      liters,
      pricePerLiter,
      totalCost: +(liters * pricePerLiter).toFixed(2),
      fullTank: true,
      station: i % 2 ? "Afriquia" : "Shell",
    };
  });
  await prisma.fuelLog.createMany({ data: fuelLogs });

  await prisma.maintenance.createMany({
    data: [
      { carId: car.id, garageId: garageA.id, type: "OIL_CHANGE", date: daysAgo(170), mileage: 80_000, cost: 650, description: "Oil + filter" },
      { carId: car.id, garageId: garageB.id, type: "TIRES", date: daysAgo(90), mileage: 84_000, cost: 2400, description: "4 new tires" },
    ],
  });

  await prisma.trip.createMany({
    data: [
      { carId: car.id, date: daysAgo(20), from: "Casablanca", to: "Rabat", distanceKm: 87 },
      { carId: car.id, date: daysAgo(10), from: "Casablanca", to: "Marrakech", distanceKm: 240, notes: "Weekend" },
    ],
  });

  await prisma.reminder.createMany({
    data: [
      { carId: car.id, title: "Oil change", type: "MAINTENANCE", dueMileage: 90_000 },
      { carId: car.id, title: "Technical inspection", type: "INSPECTION", dueDate: daysFromNow(20) },
    ],
  });

  await prisma.insurance.create({
    data: { carId: car.id, provider: "Wafa Assurance", policyNumber: "WA-2025-0042", coverage: "THIRD_PARTY_PLUS", startDate: daysAgo(340), endDate: daysFromNow(25), premium: 3200 },
  });

  await prisma.complaint.create({
    data: { userId: driver.id, garageId: garageA.id, carId: car.id, category: "GARAGE", subject: "Car returned late", message: "The oil change took 3 days instead of the promised 1 day." },
  });

  console.log("✅ Seeded. Logins: admin@smartcar.test / admin123 — driver@smartcar.test / driver123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
