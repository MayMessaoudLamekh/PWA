import { z } from "zod";
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUSES, valuesOf } from "@/config/constants";
import { optionalString } from "@/lib/zod";

export const complaintSchema = z.object({
  category: z.enum(valuesOf(COMPLAINT_CATEGORIES)),
  subject: z.string().trim().min(3, "Subject is too short"),
  message: z.string().trim().min(10, "Please give a few more details"),
  carId: optionalString(),
  garageId: optionalString(),
});

export const complaintResponseSchema = z.object({
  status: z.enum(valuesOf(COMPLAINT_STATUSES)),
  response: optionalString(),
});
