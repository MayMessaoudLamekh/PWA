import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import {
  decryptSession,
  encryptSession,
  SESSION_COOKIE,
  SESSION_DURATION_MS,
  type SessionPayload,
} from "@/lib/session-token";

export async function createSession(payload: SessionPayload) {
  const token = await encryptSession(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + SESSION_DURATION_MS),
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/** Current user or null. Cached per request. */
export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const session = await decryptSession(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) return null;
  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, phone: true, role: true },
  });
});

/**
 * Use at the top of every page and server action that needs a logged-in user.
 * Server actions are public POST endpoints — never skip this check.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/dashboard");
  return user;
}
