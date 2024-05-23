"use server";

import prisma from "../prisma";
import { User } from "@prisma/client";
import { generateCard } from "./profileActions";

interface SignupProp {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export async function createUser(
  user: Omit<
    User,
    "id" | "emailVerified" | "image" | "role" | "createdAt" | "updatedAt" | "balance"
  >
) {
  const userExist = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (userExist) return "userExist";

  try {
    const createdAcct = await prisma.user.create({
      data: { ...user, role: "user", emailVerified: new Date(), balance: 0 },
    });

    const card1 = await generateCard({
      id: createdAcct.id,
      amount: 0,
      currency: "USD",
    });
    const card2 = await generateCard({
      id: createdAcct.id,
      amount: 0,
      currency: "USD",
    });

    console.log({ card1, card2 });

    return "success";
  } catch (err) {
    console.log(err);
    return "errorOccurred";
  }
}
