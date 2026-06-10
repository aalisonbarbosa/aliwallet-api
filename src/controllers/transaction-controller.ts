import type { FastifyReply, FastifyRequest } from "fastify";
import * as transactionService from "../services/transaction-service.js";
import type { CreateTransactionInput, UpdateTransactionInput } from "../schemas/transaction-schema.js";

type CreateTransactionRequest = FastifyRequest<{Body: CreateTransactionInput}>;

type UpdateTransactionRequest = FastifyRequest<{
  Params: { id: string };
  Body: UpdateTransactionInput;
}>;


export async function createTransaction(
  req: CreateTransactionRequest,
  reply: FastifyReply,
) {
  try {
    const transaction = await transactionService.createTransaction(
      req.user.id,
      req.body,
    );

    return reply.status(201).send(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);

    return reply.status(500).send({ error: "Failed to create transaction" });
  }
}

export async function updateTransaction(
  req: UpdateTransactionRequest,
  reply: FastifyReply,
) {
  try {
    const transaction = await transactionService.updateTransaction(
      req.params.id,
      req.user.id,
      req.body,
    );

    return reply.status(200).send(transaction);
  } catch (error) {
    console.error("Error updating transaction:", error);

    return reply.status(500).send({ error: "Failed to update transaction" });
  }
}

export async function getTransactionsByUserId(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const transactions = await transactionService.getTransactionsByUserId(
      req.user.id,
    );

    return reply.status(200).send(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);

    return reply.status(500).send({ error: "Failed to fetch transactions" });
  }
}

export async function deleteTransaction(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = req.params;

    await transactionService.deleteTransaction(id, req.user.id);

    return reply
      .status(200)
      .send({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);

    return reply.status(500).send({ error: "Failed to delete transaction" });
  }
}
