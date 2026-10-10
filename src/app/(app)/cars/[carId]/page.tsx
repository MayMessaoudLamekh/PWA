import { notFound } from "next/navigation";
import { getCar } from "@/features/cars/queries";
import { requireUser } from "@/lib/session";

// MODULE: Car Management — car details
// Data:      getCar(user.id, carId) → includes fuelLogs, maintenances, trips, reminders, insurances
//            listGarageOptions()    → src/features/garages/queries.ts (for the maintenance form)
// Analytics: src/features/cars/analytics.ts
//   📊 consumptionSeries / averageConsumption   🔧 predictNextMaintenance
//   💰 costSummary                               📈 monthlyCosts
//   📅 reminderStatus / upcomingReminders
// Actions (src/features/cars/actions.ts):
//   updateCar, deleteCar, addFuelLog, deleteFuelLog, addMaintenance, deleteMaintenance,
//   addTrip, deleteTrip, addReminder, toggleReminder, deleteReminder
// TODO (UI): sections/tabs for overview, consumption, maintenance, trips, reminders
export default async function CarDetailPage({ params }: PageProps<"/cars/[carId]">) {
  const { carId } = await params;
  const user = await requireUser();
  const car = await getCar(user.id, carId);
  if (!car) notFound();

  return <h1>{car.brand} {car.model}</h1>;
}
