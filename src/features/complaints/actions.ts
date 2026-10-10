"use server";

import { revalidatePath } from "next/cache";
import { formToObject, validationError, type ActionState } from "@/lib/action-state";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireUser } from "@/lib/session";
import { complaintResponseSchema, complaintSchema } from "./schemas";

export async function createComplaint(_: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = complaintSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  if (parsed.data.carId) {
    const car = await prisma.car.findFirst({ where: { id: parsed.data.carId, ownerId: user.id } });
    if (!car) return { ok: false, errors: { carId: ["Car not found"] } };
  }

  await prisma.complaint.create({ data: { ...parsed.data, userId: user.id } });
  revalidatePath("/complaints");
  return { ok: true, message: "Complaint submitted. We'll get back to you." };
}

/** Admin: change status and/or write a response. */
export async function respondToComplaint(id: string, _: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = complaintResponseSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  await prisma.complaint.update({ where: { id }, data: parsed.data });
  revalidatePath("/complaints");
  return { ok: true, message: "Saved." };
}

export async function deleteComplaint(id: string) {
  const user = await requireUser();
  await prisma.complaint.deleteMany({
    where: user.role === "ADMIN" ? { id } : { id, userId: user.id },
  });
  revalidatePath("/complaints");
}
