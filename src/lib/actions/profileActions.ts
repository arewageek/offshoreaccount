"use server";

import prisma from "../prisma";

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

  console.log(users);

  return users;
}

export async function getUserData({ id }: { id: string }) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new Error("Invalid User ID ");

  return user;
}
