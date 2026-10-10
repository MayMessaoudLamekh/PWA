import { z } from "zod";

// Form inputs always arrive as strings. These helpers turn "" into
// undefined/null and coerce numbers & dates, so schemas stay short.

const empty = (v: unknown) => (v === "" || v === null ? undefined : v);

export const requiredNumber = (msg = "Required") =>
  z.preprocess(empty, z.coerce.number({ error: msg }).nonnegative("Must be ≥ 0"));

export const optionalNumber = () =>
  z.preprocess(empty, z.coerce.number().nonnegative("Must be ≥ 0").optional()).transform((v) => v ?? null);

export const requiredDate = (msg = "Required") =>
  z.preprocess(empty, z.coerce.date({ error: msg }));

export const optionalDate = () =>
  z.preprocess(empty, z.coerce.date().optional()).transform((v) => v ?? null);

export const optionalString = () =>
  z.preprocess(empty, z.string().trim().optional()).transform((v) => v ?? null);

export const checkbox = () => z.preprocess((v) => v === "on" || v === "true", z.boolean());

const OBJECT_ID = /^[a-f\d]{24}$/i;

/** A MongoDB ObjectId referencing another document (e.g. carId). */
export const objectId = (msg = "Invalid id") => z.string().regex(OBJECT_ID, msg);

export const optionalObjectId = () =>
  z.preprocess(empty, z.string().regex(OBJECT_ID, "Invalid id").optional()).transform((v) => v ?? null);
