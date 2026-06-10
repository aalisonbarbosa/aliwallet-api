import type { FastifyInstance } from "fastify";
import * as transactionController from "../controllers/transaction-controller.js";
import { createTransactionSchema, updateTransactionSchema } from "../schemas/transaction-schema.js";

export default async function transactionRouter(app: FastifyInstance) {
  app.post(
    "/transactions",
    {
      schema: {
        body: createTransactionSchema,
      },
    },
    transactionController.createTransaction,
  );

  app.put(
    "/transactions/:id",
    {
      schema: {
        body: updateTransactionSchema,
      },
    },
    transactionController.updateTransaction,
  );

  app.get("/transactions", transactionController.getTransactionsByUserId);

  app.delete("/transactions/:id", transactionController.deleteTransaction);
}
