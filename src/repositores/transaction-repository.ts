import { prisma } from "../lib/prisma.js";
import type { CreateTransactionInput, UpdateTransactionInput } from "../schemas/transaction-schema.js";

export async function createTransaction(
  userId: string,
  data: CreateTransactionInput,
) {
  return prisma.transaction.create({
    data: {
      userId,
      ...data,
      description: data.description ?? null,
    },
  });
}

export async function updateTransaction(
  transactionId: string,
  userId: string,
  updateData: UpdateTransactionInput,
) {
  return prisma.transaction.update({
    where: {
      id: transactionId,
      userId,
    },
    data: {
      ...updateData,
      description: updateData.description ?? null,
    },
  });
}

export async function getTransactionsByUserId(userId: string) {
  return prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function deleteTransaction(transactionId: string, userId: string) {
  return prisma.transaction.delete({
    where: {
      id: transactionId,
      userId,
    },
  });
}
