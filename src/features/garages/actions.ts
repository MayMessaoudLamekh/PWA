"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formToObject, validationError, type ActionState } from "@/lib/action-state";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { garageSchema } from "./schemas";

// Garages are shared data: only admins can create / edit / delete them.

export async function createGarage(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = garageSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  await prisma.garage.create({ data: parsed.data });
  revalidatePath("/garages");
  return { ok: true, message: "Garage added." };
}

export async function updateGarage(id: string, _: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = garageSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  await prisma.garage.update({ where: { id }, data: parsed.data });
  revalidatePath("/garages");
  redirect("/garages");
}

export async function deleteGarage(id: string) {
  await requireAdmin();
  await prisma.garage.delete({ where: { id } });
  revalidatePath("/garages");
}
