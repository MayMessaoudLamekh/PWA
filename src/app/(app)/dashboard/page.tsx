import { requireUser } from "@/lib/session";

// MODULE: Car Management (overview of all the user's cars)
// Data:      listCarsWithHistory(user.id)                 → src/features/cars/queries.ts
// Analytics: costSummary, averageConsumption,
//            predictNextMaintenance, upcomingReminders    → src/features/cars/analytics.ts
//            insuranceStatus                              → src/features/insurance/status.ts
// TODO (UI): stats, next maintenance per car, alerts
export default async function DashboardPage() {
  const user = await requireUser();
  return <h1>Dashboard — {user.name}</h1>;
}
