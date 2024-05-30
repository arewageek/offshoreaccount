"use server";

import prisma from "../prisma";

export async function allTransactionsPerUser({
  user,
}: {
  user: string | undefined;
}) {
  const transactions = user
    ? await prisma.transactions.findMany({
        where: { user },
        orderBy: { createAt: "desc" },
      })
    : [];

  if (!transactions) return [];

  console.log(user, transactions);

  return transactions;
}

export async function getTranaction({ id }: { id: string }) {
  const transaction = await prisma.transactions.findUnique({
    where: { id },
  });

  //   console.log({ transaction });

  return transaction;
}

export async function createTransaction({
  user,
  accountName,
  accountNumber,
  bankName,
  routingNumber,
  swiftCode,
  amount,
  currency,
}: {
  user: string | undefined;
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
  amount: number;
  swiftCode: string;
  currency: string;
}): Promise<"success" | "failed"> {
  const createTrx = await prisma.transactions.create({
    data: {
      accountName,
      accountNumber,
      bankName,
      user: user as string,
      routingNumber,
      swiftCode,
      amount: Number(amount),
      createAt: new Date(),
      status: "pending",
      currency,
      desc: "Wire Transfer",
    },
  });

  if (!createTrx) return "failed";

  return "success";
}

export async function updateTrx({
  accountName,
  accountNumber,
  bankName,
  swiftCode,
  routingNumber,
  amount,
  id,
}: {
  accountName: string;
  accountNumber: string;
  bankName: string;
  swiftCode: string;
  routingNumber: string;
  amount: string;
  id: string | undefined;
}) {
  const updateTrx = await prisma.transactions.update({
    where: { id },
    data: {
      accountName,
      accountNumber,
      bankName,
      swiftCode,
      routingNumber,
      amount: Number(amount),
    },
  });

  if (!updateTrx) return "failed";

  return "success";
}

export async function trxStatusUpdate({
  id,
  status,
}: {
  id: string;
  status: "confirm" | "decline";
}): Promise<"success" | "failed"> {
  const updated = await prisma.transactions.update({
    where: { id },
    data: {
      status,
    },
  });

  if (!updated) return "failed";
  return "success";
}
