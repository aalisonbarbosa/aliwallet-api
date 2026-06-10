import * as transactionRepository from "../repositores/transaction-repository.js";
import type { CreateTransactionInput, UpdateTransactionInput } from "../schemas/transaction-schema.js";

export async function createTransaction(
  userId: string,
  data: CreateTransactionInput,
) {
  return transactionRepository.createTransaction(userId, data);
}

export async function updateTransaction(
  transactionId: string,
  userId: string,
  updateData: UpdateTransactionInput,
) {
  return transactionRepository.updateTransaction(transactionId, userId, updateData);
}

export async function getTransactionsByUserId(userId: string) {
  return transactionRepository.getTransactionsByUserId(userId);
}

export async function deleteTransaction(transactionId: string, userId: string) {
  return transactionRepository.deleteTransaction(transactionId, userId);
}
