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
