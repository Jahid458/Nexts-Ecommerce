import { z } from "zod";

export const zSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[@$!%*?&]/, "Must include at least one special character"),
});
