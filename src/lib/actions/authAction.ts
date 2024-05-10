"use server";

import prisma from "../prisma";
import { User } from "@prisma/client";

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
    "id" | "emailVerified" | "image" | "role" | "createdAt" | "updatedAt"
  >
) {
  const userExist = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (userExist) return "userExist";

  try {
    await prisma.user.create({
      data: { ...user, role: "user", emailVerified: new Date() },
    });
    return "success";
  } catch (err) {
    console.log(err);
    return "errorOccurred";
  }
}
