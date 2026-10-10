import { z } from "zod";
import { ROLES, valuesOf } from "@/config/constants";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name is too short"),
  email: z.email("Invalid email").trim().toLowerCase(),
  password: z.string().min(6, "At least 6 characters"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name is too short"),
  phone: z.string().trim().optional().transform((v) => v || null),
});

export const roleSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(valuesOf(ROLES)),
});
