import { z } from "zod";

export const habitPatchSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long.",
  }).max(32, {
    message: "Name must be at most 32 characters long."
  }),
  description: z.string().max(256, {
    message: "Description must be at most 256 characters long."
  }).optional(),
  category: z.string().max(32, {
    message: "Category must be at most 32 characters long."
  }).optional(),
  habitGoalValue: z.coerce.number().min(1, {
    message: "Habit goal value must be at least 1."
  }).max(100, {
    message: "Habit goal value must be at most 100."
  }),
  habitCurrentValue: z.number().default(0),
  habitGoalUnit: z.string().default("times")
});
