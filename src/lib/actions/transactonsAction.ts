"use server";

import prisma from "../prisma";

export async function allTransactionsPerUser({ user }: { user: string }) {
  const transactions = await prisma.transactions.findMany({
    where: { user },
  });

  if (!transactions) return "failed";

  return transactions;
}

export async function getTranaction({ id }: { id: string }) {
  const transaction = await prisma.transactions.findUnique({
    where: { id },
  });

  if (!transaction) throw new Error("Invalid Transaction ID ");

  return transaction;
}
