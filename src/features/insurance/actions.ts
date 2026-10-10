"use server";

import { revalidatePath } from "next/cache";
import { formToObject, validationError, type ActionState } from "@/lib/action-state";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { insuranceSchema } from "./schemas";

export async function createInsurance(_: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = insuranceSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  const car = await prisma.car.findFirst({ where: { id: parsed.data.carId, ownerId: user.id } });
  if (!car) return { ok: false, errors: { carId: ["Car not found"] } };

  await prisma.insurance.create({ data: parsed.data });
  revalidatePath("/insurance");
  revalidatePath("/dashboard");
  return { ok: true, message: "Insurance policy added." };
}

export async function deleteInsurance(id: string) {
  const user = await requireUser();
  await prisma.insurance.deleteMany({ where: { id, car: { ownerId: user.id } } });
  revalidatePath("/insurance");
  revalidatePath("/dashboard");
}
