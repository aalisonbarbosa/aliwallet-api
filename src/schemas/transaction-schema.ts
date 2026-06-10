import z from "zod";

export const createTransactionSchema = z.object({
  title: z.string().min(1),
  amount: z.number(),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z.coerce.date(),
  categoryId: z.string(),
  description: z.string().optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export const updateTransactionSchema = createTransactionSchema.partial();

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
