const DAY_MS = 24 * 60 * 60 * 1000;

export type InsuranceStatus = "ACTIVE" | "EXPIRING" | "EXPIRED";

/** ACTIVE / EXPIRING (≤ 30 days left) / EXPIRED */
export function insuranceStatus(endDate: Date, now = new Date()): { status: InsuranceStatus; daysLeft: number } {
  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / DAY_MS);
  if (daysLeft < 0) return { status: "EXPIRED", daysLeft };
  if (daysLeft <= 30) return { status: "EXPIRING", daysLeft };
  return { status: "ACTIVE", daysLeft };
}
