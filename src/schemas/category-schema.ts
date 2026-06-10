import z from "zod";

export const createCategorySchema = z.object({
  name: z.string(),
  color: z.string(),
  type: z.enum(["INCOME", "EXPENSE"]),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6})$/)
    .optional(),

  type: z.enum(["INCOME", "EXPENSE"]).optional(),

  name: z.string().optional(),
});

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
