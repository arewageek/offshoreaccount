import { userBalance } from "@/lib/actions/profileActions";
import React from "react";
import UserBalanceContent from "./UserBalanceContent";

export const UserBalance = async ({ id }: { id: string | undefined }) => {
  const balance = await userBalance({ id });

  return <UserBalanceContent balance={balance} id={id} />;
};

export default UserBalance;
