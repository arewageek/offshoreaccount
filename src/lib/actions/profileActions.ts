"use server";

import { buffer } from "stream/consumers";
import prisma from "../prisma";
import { join } from "path";
import { writeFile } from "fs/promises";
import { createTransaction } from "./transactonsAction";

interface Props {
  email: string | undefined;
  oldPassword: string;
  newPassword: string;
}

export async function ResetUserPassword({
  email,
  oldPassword,
  newPassword,
}: Props): Promise<
  "notFound" | "incorrectPassword" | "unknownError" | "success"
> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return "notFound";

  const isPasswordCorrect = (await user.password) == oldPassword;

  if (!isPasswordCorrect) return "incorrectPassword";

  const doReset = await prisma.user.update({
    where: { email },
    data: { password: newPassword },
  });

  if (!doReset) return "unknownError";

  return "success";
}

export async function ResetUserPasswordAsAdmin({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<"notFound" | "unknownError" | "success"> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return "notFound";

  const doReset = await prisma.user.update({
    where: { email },
    data: { password: password },
  });

  if (!doReset) return "unknownError";

  return "success";
}

export async function updateProfile({
  firstName,
  lastName,
  email,
  phone,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}): Promise<"notFound" | "unknownError" | "success"> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return "notFound";

  const update = await prisma.user.update({
    where: { email },
    data: { firstName, lastName, email, phone },
  });

  if (update) return "success";

  return "unknownError";
}

export async function allUsers() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return users;
}

export async function getUserData({ id }: { id: string }) {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
}

export async function UpdateProfileAsAdmin({
  firstName,
  lastName,
  email,
  phone,
}: {
  firstName: string;
  email: string;
  lastName: string;
  phone: string;
}): Promise<"success" | "unknownError"> {
  const updateProfile = await prisma.user.update({
    where: { email },
    data: {
      firstName,
      lastName,
      email,
      phone,
    },
  });

  if (!updateProfile) return "unknownError";

  return "success";
}

// export async function ImageUpload(data: FormData) {
//   console.log("seen");

//   const file = data.get("file") as unknown as File;
//   const email = data.get("email");

//   if (!file) {
//     console.log("no file found");
//     return "noFileSelected";
//   }
//   console.log("fs");

//   try {
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const path = join("/", "tmp", file.name);
//     await writeFile(path, buffer);

//     console.log(`File uploaded to :::: ${path}`);

//     return "success";
//   } catch (e) {
//     console.log(e);
//   }
// }

export async function getCards({ id }: { id: string }): Promise<
  {
    id: string;
    user: string;
    cardNumber: string;
    cardName: string;
    provider: string;
    cvv: string;
    expireDate: string;
    currency: string;
    balance: number;
  }[]
> {
  const cards = await prisma.cards.findMany({ where: { user: id } });

  return cards;
}

export async function getCardById({ id }: { id: string }) {
  const card = await prisma.cards.findUnique({ where: { id } });

  return card;
}

export async function generateCard({
  id,
  amount,
  currency,
}: {
  id: string;
  amount: number;
  currency: string | null;
}): Promise<"failed" | "success" | "userNofFound"> {
  // demo data for cards
  const cardProviders = ["visa"];

  const currencyList = ["USD", "CYN"];

  currency =
    currency || currencyList[Math.floor(Math.random() * currencyList.length)];

  // user data
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return "userNofFound";

  // generate random card data

  const cardData = {
    user: id,
    cardNumber: `${Math.floor(Math.random() * 9999999999999999)}`,
    cardName: `${user?.firstName} ${user?.lastName}`,
    provider: cardProviders[Math.floor(Math.random() * cardProviders.length)],
    cvv: `${Math.floor(Math.random() * 999)}`,
    expireDate: "01/27",
    currency,
    balance: amount,
  };

  const createCard = await prisma.cards.create({ data: { ...cardData } });

  if (createCard) return "success";
  return "failed";
}

export async function updateCardBalanceAction({
  id,
  amount,
}: {
  id: string;
  amount: number;
}): Promise<"success" | "failed" | "unknownError"> {
  // get card owner
  const card = await prisma.cards.findUnique({ where: { id } });
  const prevBalance = card?.balance as number;

  const user = await prisma.user.findUnique({ where: { id: card?.user } });

  const currency = card?.currency;

  const cardUpdated = await prisma.cards.update({
    where: { id },
    data: { balance: prevBalance + amount },
  });

  if (!cardUpdated) return "failed";

  //  create transacton information
  const transactionData: {
    user: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    routingNumber: string;
    swiftCode: string;
    amount: number;
    currency: string;
  } = {
    user: id,
    accountName: `${user?.firstName} ${user?.lastName}`, // card owner name
    accountNumber: "3445688553343",
    bankName: "Offshore Wallet",
    routingNumber: `${Math.floor(Math.random() * 9999999999)}`,
    swiftCode: `${Math.floor(Math.random() * 9999999999)}`,
    amount: amount,
    currency: currency as string,
  };

  const newTrx = await createTransaction(transactionData);

  if (!newTrx) return "unknownError";

  return "success";
}


export async function userBalance ({ id } : { id: string | undefined}){
  const user = await prisma.user.fetchUnique({ where: { id }})
  const balance = await user.balance;

  return balance;
}