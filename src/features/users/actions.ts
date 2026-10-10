"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formToObject, validationError, type ActionState } from "@/lib/action-state";
import { isObjectId } from "@/lib/object-id";
import { hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession, requireAdmin, requireUser } from "@/lib/session";
import { loginSchema, profileSchema, registerSchema, roleSchema } from "./schemas";

export async function register(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  const { name, email, password } = parsed.data;
  if (await prisma.user.findUnique({ where: { email } })) {
    return { ok: false, errors: { email: ["Email already registered"] } };
  }

  // The very first account becomes ADMIN so the team can manage the app.
  const isFirstUser = (await prisma.user.count()) === 0;
  const user = await prisma.user.create({
    data: { name, email, passwordHash: await hashPassword(password), role: isFirstUser ? "ADMIN" : "USER" },
  });

  await createSession({ userId: user.id, role: user.role });
  redirect("/dashboard");
}

export async function login(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { ok: false, message: "Invalid email or password." };
  }

  await createSession({ userId: user.id, role: user.role });
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function updateProfile(_: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = profileSchema.safeParse(formToObject(formData));
  if (!parsed.success) return validationError(parsed.error);

  await prisma.user.update({ where: { id: user.id }, data: parsed.data });
  revalidatePath("/", "layout");
  return { ok: true, message: "Profile updated." };
}

// ---- Admin -----------------------------------------------------------------

export async function changeUserRole(formData: FormData) {
  const admin = await requireAdmin();
  const parsed = roleSchema.safeParse(formToObject(formData));
  if (!parsed.success || parsed.data.userId === admin.id) return;

  await prisma.user.update({ where: { id: parsed.data.userId }, data: { role: parsed.data.role } });
  revalidatePath("/users");
}

export async function deleteUser(formData: FormData) {
  const admin = await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  if (!isObjectId(userId) || userId === admin.id) return;

  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/users");
}
