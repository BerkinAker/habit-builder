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
  category: z.string().min(3, {
    message: "Category must be at least 3 characters long.",
  }).max(32, {
    message: "Category must be at most 32 characters long."
  }),
})