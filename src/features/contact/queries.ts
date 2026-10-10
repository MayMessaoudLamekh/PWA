import "server-only";
import { prisma } from "@/lib/prisma";

/** For a future admin inbox page. */
export function listContactMessages() {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
}
