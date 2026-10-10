import { z } from "zod";
import { optionalString } from "@/lib/zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.email("Invalid email").trim().toLowerCase(),
  phone: optionalString(),
  message: z.string().trim().min(10, "Please write a few more words"),
});
