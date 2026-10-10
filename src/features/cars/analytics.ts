// Pure functions (no DB, no React) that turn a car's history into insights:
// consumption, costs, evolution charts, reminders and maintenance prediction.
// Easy to unit-test — pass plain objects in, get numbers out.

import { MAINTENANCE_INTERVAL_KM } from "@/config/constants";

type FuelLog = { date: Date; mileage: number; liters: number; totalCost: number; fullTank: boolean };
type Maintenance = { date: Date; mileage: number; cost: number; type: string };
type Insurance = { startDate: Date; endDate: Date; premium: number };
type Reminder = { id: string; title: string; dueDate: Date | null; dueMileage: number | null; done: boolean };

const DAY_MS = 24 * 60 * 60 * 1000;
const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
const shortDate = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}`;

// ---- 📊 Consumption --------------------------------------------------------------

/**
 * L/100km between consecutive full-tank refuels ("full-to-full" method).
 * Liters of partial fills in between are added to the next full fill.
 */
export function consumptionSeries(fuelLogs: FuelLog[]) {
  const logs = [...fuelLogs].sort((a, b) => a.mileage - b.mileage);
  const series: { date: Date; label: string; value: number }[] = [];
  let lastFull: FuelLog | null = null;
  let liters = 0;

  for (const log of logs) {
    if (!lastFull) {
      if (log.fullTank) lastFull = log;
      continue;
    }
    liters += log.liters;
    if (!log.fullTank) continue;

    const distance = log.mileage - lastFull.mileage;
    if (distance > 0) {
      series.push({ date: log.date, label: shortDate(log.date), value: +((liters / distance) * 100).toFixed(2) });
    }
    lastFull = log;
    liters = 0;
  }
  return series;
}

export function averageConsumption(fuelLogs: FuelLog[]) {
  const series = consumptionSeries(fuelLogs);
  if (series.length === 0) return null;
  return series.reduce((sum, p) => sum + p.value, 0) / series.length;
}

// ---- 💰 Costs ----------------------------------------------------------------------

export function costSummary(input: {
  fuelLogs: FuelLog[];
  maintenances: Maintenance[];
  insurances: Insurance[];
}) {
  const fuel = input.fuelLogs.reduce((s, f) => s + f.totalCost, 0);
  const maintenance = input.maintenances.reduce((s, m) => s + m.cost, 0);
  const insurance = input.insurances.reduce((s, i) => s + i.premium, 0);

  const mileages = [...input.fuelLogs, ...input.maintenances].map((x) => x.mileage);
  const distance = mileages.length > 1 ? Math.max(...mileages) - Math.min(...mileages) : 0;

  return {
    fuel,
    maintenance,
    insurance,
    total: fuel + maintenance + insurance,
    /** running cost (fuel + maintenance) per km over the recorded distance */
    perKm: distance > 0 ? (fuel + maintenance) / distance : null,
  };
}

// ---- 📈 Evolution ------------------------------------------------------------------

/** Fuel + maintenance spending per month (for the costs chart). */
export function monthlyCosts(fuelLogs: FuelLog[], maintenances: Maintenance[]) {
  const totals = new Map<string, number>();
  for (const f of fuelLogs) totals.set(monthKey(f.date), (totals.get(monthKey(f.date)) ?? 0) + f.totalCost);
  for (const m of maintenances) totals.set(monthKey(m.date), (totals.get(monthKey(m.date)) ?? 0) + m.cost);

  return [...totals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => ({ label: key.slice(5) + "/" + key.slice(2, 4), value: +value.toFixed(2) }));
}

// ---- 🔧 Maintenance prediction ---------------------------------------------------

/** Average km driven per day, from every dated odometer reading we have. */
export function kmPerDay(readings: { date: Date; mileage: number }[]) {
  if (readings.length < 2) return null;
  const sorted = [...readings].sort((a, b) => a.date.getTime() - b.date.getTime());
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const days = (last.date.getTime() - first.date.getTime()) / DAY_MS;
  const km = last.mileage - first.mileage;
  if (days < 1 || km <= 0) return null;
  return km / days;
}

/**
 * "Based on your driving history, your next maintenance is probably due around…"
 * Next service = last service mileage + MAINTENANCE_INTERVAL_KM,
 * date estimated from the average km/day.
 */
export function predictNextMaintenance(input: {
  currentMileage: number;
  fuelLogs: FuelLog[];
  maintenances: Maintenance[];
  now?: Date;
}) {
  const now = input.now ?? new Date();
  const lastService = [...input.maintenances].sort((a, b) => b.mileage - a.mileage)[0];
  const baseMileage = lastService?.mileage ?? Math.floor(input.currentMileage / MAINTENANCE_INTERVAL_KM) * MAINTENANCE_INTERVAL_KM;
  const dueMileage = baseMileage + MAINTENANCE_INTERVAL_KM;
  const kmLeft = dueMileage - input.currentMileage;

  const rate = kmPerDay([...input.fuelLogs, ...input.maintenances]);
  const dueDate = rate ? new Date(now.getTime() + Math.max(kmLeft, 0) / rate * DAY_MS) : null;

  return {
    dueMileage,
    kmLeft,
    kmPerDay: rate,
    dueDate,
    overdue: kmLeft <= 0,
    basedOnHistory: rate !== null,
  };
}

// ---- 📅 Reminders --------------------------------------------------------------------

export type ReminderStatus = "overdue" | "soon" | "later";

export function reminderStatus(r: Reminder, currentMileage: number, now = new Date()): ReminderStatus {
  const daysLeft = r.dueDate ? (r.dueDate.getTime() - now.getTime()) / DAY_MS : Infinity;
  const kmLeft = r.dueMileage != null ? r.dueMileage - currentMileage : Infinity;
  if (daysLeft < 0 || kmLeft < 0) return "overdue";
  if (daysLeft <= 30 || kmLeft <= 1000) return "soon";
  return "later";
}

export function upcomingReminders(reminders: Reminder[], currentMileage: number, now = new Date()) {
  return reminders
    .filter((r) => !r.done)
    .map((r) => ({ ...r, status: reminderStatus(r, currentMileage, now) }))
    .filter((r) => r.status !== "later");
}
