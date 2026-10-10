import { z } from "zod";
import { FUEL_TYPES, MAINTENANCE_TYPES, REMINDER_TYPES, valuesOf } from "@/config/constants";
import {
  checkbox,
  optionalDate,
  optionalNumber,
  optionalObjectId,
  optionalString,
  requiredDate,
  requiredNumber,
} from "@/lib/zod";

export const carSchema = z.object({
  brand: z.string().trim().min(1, "Required"),
  model: z.string().trim().min(1, "Required"),
  year: z.coerce.number().int().min(1950, "Invalid year").max(new Date().getFullYear() + 1, "Invalid year"),
  plateNumber: z.string().trim().min(1, "Required").toUpperCase(),
  vin: optionalString(),
  fuelType: z.enum(valuesOf(FUEL_TYPES)),
  mileage: requiredNumber().pipe(z.number().int()),
});

export const fuelLogSchema = z.object({
  date: requiredDate(),
  mileage: requiredNumber().pipe(z.number().int()),
  liters: requiredNumber().pipe(z.number().positive("Must be > 0")),
  pricePerLiter: requiredNumber().pipe(z.number().positive("Must be > 0")),
  fullTank: checkbox(),
  station: optionalString(),
});

export const maintenanceSchema = z.object({
  type: z.enum(valuesOf(MAINTENANCE_TYPES)),
  date: requiredDate(),
  mileage: requiredNumber().pipe(z.number().int()),
  cost: requiredNumber(),
  description: optionalString(),
  garageId: optionalObjectId(),
});

export const tripSchema = z.object({
  date: requiredDate(),
  from: z.string().trim().min(1, "Required"),
  to: z.string().trim().min(1, "Required"),
  distanceKm: requiredNumber().pipe(z.number().positive("Must be > 0")),
  notes: optionalString(),
});

export const reminderSchema = z
  .object({
    title: z.string().trim().min(1, "Required"),
    type: z.enum(valuesOf(REMINDER_TYPES)),
    dueDate: optionalDate(),
    dueMileage: optionalNumber(),
  })
  .refine((r) => r.dueDate || r.dueMileage, {
    message: "Set a due date or a due mileage",
    path: ["dueDate"],
  });
