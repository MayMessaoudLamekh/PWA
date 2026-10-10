import { z } from "zod";
import { COVERAGE_TYPES, valuesOf } from "@/config/constants";
import { requiredDate, requiredNumber } from "@/lib/zod";

export const insuranceSchema = z
  .object({
    carId: z.string().min(1, "Choose a car"),
    provider: z.string().trim().min(2, "Required"),
    policyNumber: z.string().trim().min(1, "Required"),
    coverage: z.enum(valuesOf(COVERAGE_TYPES)),
    startDate: requiredDate(),
    endDate: requiredDate(),
    premium: requiredNumber(),
  })
  .refine((i) => i.endDate > i.startDate, { message: "End date must be after start date", path: ["endDate"] });
