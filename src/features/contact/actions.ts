"use server";

import { formToObject, validationError, type ActionState } from "@/lib/action-state";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "./schemas";

/** Public "Get in touch" form on the landing page (no login required). */
export async function sendContactMessage(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = contactSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  await prisma.contactMessage.create({ data: parsed.data });
  return { ok: true, message: "Thanks! Your message has been sent." };
}
