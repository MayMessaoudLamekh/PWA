// Single source of truth for enum-like values stored as strings in the DB.
// Keep in sync with the comments in prisma/schema.prisma.

export const APP = {
  name: "SmartCar",
  locale: "fr-MA",
  currency: "MAD",
  // Public contact details shown on the landing page — replace with the team's.
  contactPhone: "+212 6 00 00 00 00",
  contactEmail: "contact@smartcar.test",
} as const;

const opts = <T extends string>(o: { value: T; label: string }[]) => o;

export const ROLES = opts([
  { value: "USER", label: "User" },
  { value: "ADMIN", label: "Admin" },
]);

export const FUEL_TYPES = opts([
  { value: "PETROL", label: "Petrol" },
  { value: "DIESEL", label: "Diesel" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "ELECTRIC", label: "Electric" },
  { value: "LPG", label: "LPG" },
]);

export const MAINTENANCE_TYPES = opts([
  { value: "OIL_CHANGE", label: "Oil change" },
  { value: "TIRES", label: "Tires" },
  { value: "BRAKES", label: "Brakes" },
  { value: "INSPECTION", label: "Technical inspection" },
  { value: "BATTERY", label: "Battery" },
  { value: "FILTERS", label: "Filters" },
  { value: "OTHER", label: "Other" },
]);

/** Default service interval (km) used by the maintenance prediction. */
export const MAINTENANCE_INTERVAL_KM = 10_000;

export const REMINDER_TYPES = opts([
  { value: "MAINTENANCE", label: "Maintenance" },
  { value: "INSURANCE", label: "Insurance" },
  { value: "INSPECTION", label: "Inspection" },
  { value: "OTHER", label: "Other" },
]);

export const COVERAGE_TYPES = opts([
  { value: "THIRD_PARTY", label: "Third party" },
  { value: "THIRD_PARTY_PLUS", label: "Third party +" },
  { value: "ALL_RISK", label: "All risk" },
]);

export const COMPLAINT_CATEGORIES = opts([
  { value: "GARAGE", label: "Garage" },
  { value: "INSURANCE", label: "Insurance" },
  { value: "APP", label: "Application" },
  { value: "OTHER", label: "Other" },
]);

export const COMPLAINT_STATUSES = opts([
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CLOSED", label: "Closed" },
]);

export const valuesOf = <T extends string>(o: { value: T }[]) =>
  o.map((x) => x.value) as [T, ...T[]];
