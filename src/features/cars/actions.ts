"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formToObject, validationError, type ActionState } from "@/lib/action-state";
import { isObjectId } from "@/lib/object-id";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { carSchema, fuelLogSchema, maintenanceSchema, reminderSchema, tripSchema } from "./schemas";

/** Throws if the car doesn't belong to the current user. */
async function requireOwnCar(carId: string) {
  const user = await requireUser();
  if (!isObjectId(carId)) throw new Error("Car not found");
  const car = await prisma.car.findFirst({ where: { id: carId, ownerId: user.id } });
  if (!car) throw new Error("Car not found");
  return car;
}

/** Keep the car's odometer up to date when a newer reading is recorded. */
async function bumpMileage(carId: string, current: number, reading: number) {
  if (reading > current) await prisma.car.update({ where: { id: carId }, data: { mileage: reading } });
}

const refresh = (carId?: string) => {
  revalidatePath("/cars");
  revalidatePath("/dashboard");
  if (carId) revalidatePath(`/cars/${carId}`);
};

// ---- Car -------------------------------------------------------------------

export async function createCar(_: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = carSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  if (await prisma.car.findUnique({ where: { plateNumber: parsed.data.plateNumber } })) {
    return { ok: false, errors: { plateNumber: ["This plate is already registered"] } };
  }

  const car = await prisma.car.create({ data: { ...parsed.data, ownerId: user.id } });
  refresh();
  redirect(`/cars/${car.id}`);
}

export async function updateCar(carId: string, _: ActionState, formData: FormData): Promise<ActionState> {
  await requireOwnCar(carId);
  const parsed = carSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  const clash = await prisma.car.findUnique({ where: { plateNumber: parsed.data.plateNumber } });
  if (clash && clash.id !== carId) {
    return { ok: false, errors: { plateNumber: ["This plate is already registered"] } };
  }

  await prisma.car.update({ where: { id: carId }, data: parsed.data });
  refresh(carId);
  redirect(`/cars/${carId}`);
}

export async function deleteCar(carId: string) {
  await requireOwnCar(carId);
  await prisma.car.delete({ where: { id: carId } });
  refresh();
  redirect("/cars");
}

// ---- Consumption (fuel logs) -------------------------------------------------

export async function addFuelLog(carId: string, _: ActionState, formData: FormData): Promise<ActionState> {
  const car = await requireOwnCar(carId);
  const parsed = fuelLogSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  const { liters, pricePerLiter } = parsed.data;
  await prisma.fuelLog.create({
    data: { ...parsed.data, totalCost: +(liters * pricePerLiter).toFixed(2), carId },
  });
  await bumpMileage(carId, car.mileage, parsed.data.mileage);
  refresh(carId);
  return { ok: true, message: "Refuel added." };
}

export async function deleteFuelLog(carId: string, id: string) {
  await requireOwnCar(carId);
  await prisma.fuelLog.deleteMany({ where: { id, carId } });
  refresh(carId);
}

// ---- Maintenance --------------------------------------------------------------

export async function addMaintenance(carId: string, _: ActionState, formData: FormData): Promise<ActionState> {
  const car = await requireOwnCar(carId);
  const parsed = maintenanceSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  await prisma.maintenance.create({ data: { ...parsed.data, carId } });
  await bumpMileage(carId, car.mileage, parsed.data.mileage);
  refresh(carId);
  return { ok: true, message: "Maintenance recorded." };
}

export async function deleteMaintenance(carId: string, id: string) {
  await requireOwnCar(carId);
  await prisma.maintenance.deleteMany({ where: { id, carId } });
  refresh(carId);
}

// ---- Trips --------------------------------------------------------------------

export async function addTrip(carId: string, _: ActionState, formData: FormData): Promise<ActionState> {
  await requireOwnCar(carId);
  const parsed = tripSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  await prisma.trip.create({ data: { ...parsed.data, carId } });
  refresh(carId);
  return { ok: true, message: "Trip added." };
}

export async function deleteTrip(carId: string, id: string) {
  await requireOwnCar(carId);
  await prisma.trip.deleteMany({ where: { id, carId } });
  refresh(carId);
}

// ---- Reminders ----------------------------------------------------------------

export async function addReminder(carId: string, _: ActionState, formData: FormData): Promise<ActionState> {
  await requireOwnCar(carId);
  const parsed = reminderSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  await prisma.reminder.create({ data: { ...parsed.data, carId } });
  refresh(carId);
  return { ok: true, message: "Reminder created." };
}

export async function toggleReminder(carId: string, id: string) {
  await requireOwnCar(carId);
  const reminder = await prisma.reminder.findFirst({ where: { id, carId } });
  if (!reminder) return;
  await prisma.reminder.update({ where: { id }, data: { done: !reminder.done } });
  refresh(carId);
}

export async function deleteReminder(carId: string, id: string) {
  await requireOwnCar(carId);
  await prisma.reminder.deleteMany({ where: { id, carId } });
  refresh(carId);
}
