import "server-only";
import { prisma } from "@/lib/prisma";

const include = {
  user: { select: { id: true, name: true, email: true } },
  car: { select: { id: true, brand: true, model: true, plateNumber: true } },
  garage: { select: { id: true, name: true } },
} as const;

/** Admins see every complaint, users only their own. */
export function listComplaints(user: { id: string; role: string }, status?: string) {
  return prisma.complaint.findMany({
    where: {
      ...(user.role === "ADMIN" ? {} : { userId: user.id }),
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: "desc" },
    include,
  });
}

export type ComplaintWithRelations = Awaited<ReturnType<typeof listComplaints>>[number];
