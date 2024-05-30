"use client";
import { userBalance } from "@/lib/actions/profileActions";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaPenAlt } from "react-icons/fa";

const MyBalance = () => {
  const session = useSession();
  const [balance, setBalance] = useState<number | undefined>(0);

  const refreshBalance = async ({ id }: { id: string }) => {
    const newBalance = await userBalance({ id });
    setBalance(newBalance);
    console.log(newBalance);
    return newBalance;
  };

  useEffect(() => {
    session.data?.user && refreshBalance({ id: session.data?.user?.id });
  }, [session.data]);

  return (
    <>
      <div className="w-full py-3 flex justify-between items-center">
        <div className="text-lg font-bold">
          <h3>Account Balance</h3>
          <h3 className="text-3xl">${balance}</h3>
        </div>
      </div>
    </>
  );
};

export default MyBalance;
