import { APP } from "@/config/constants";

export function formatMoney(value: number) {
  return new Intl.NumberFormat(APP.locale, {
    style: "currency",
    currency: APP.currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat(APP.locale, {
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatKm(value: number) {
  return `${formatNumber(value)} km`;
}

export function formatDate(value: Date | string | null | undefined) {
  if (!value) return "—";
  return new Intl.DateTimeFormat(APP.locale, { dateStyle: "medium" }).format(
    new Date(value),
  );
}

/** yyyy-mm-dd for <input type="date"> default values. */
export function toDateInput(value: Date = new Date()) {
  return new Date(value).toISOString().slice(0, 10);
}

export function labelOf<T extends string>(
  options: readonly { value: T; label: string }[],
  value: string,
) {
  return options.find((o) => o.value === value)?.label ?? value;
}
