import { z } from "zod";
import { optionalString } from "@/lib/zod";

export const garageSchema = z.object({
  name: z.string().trim().min(2, "Required"),
  address: z.string().trim().min(2, "Required"),
  city: z.string().trim().min(2, "Required"),
  phone: optionalString(),
  email: optionalString().pipe(z.email("Invalid email").nullable()),
  services: optionalString(),
  latitude: z.preprocess((v) => (v === "" ? undefined : v), z.coerce.number().min(-90).max(90).optional()).transform((v) => v ?? null),
  longitude: z.preprocess((v) => (v === "" ? undefined : v), z.coerce.number().min(-180).max(180).optional()).transform((v) => v ?? null),
});

