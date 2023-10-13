import { z } from "zod";

export const habitPatchSchema = z.object({
  name: z.string().min(3).max(32),
  description: z.string().max(256).optional(),
  category: z.string().min(3).max(32),
})