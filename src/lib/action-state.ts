import type { z } from "zod";

/** Shape returned by every form server action (used with useActionState). */
export type ActionState = {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
} | undefined;

export function formToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export function validationError(error: z.ZodError): ActionState {
  const errors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    (errors[key] ??= []).push(issue.message);
  }
  return { ok: false, message: "Please fix the errors below.", errors };
}
