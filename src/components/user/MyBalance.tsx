"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaPenAlt } from "react-icons/fa";

const MyBalance = () => {
  const session = useSession();
  const [balance, setBalance] = useState<number>(0);

  console.log(session.data?.user);

  useEffect(() => {
    setBalance(session.data?.user?.balance as number);
    console.log("working", balance);
  }, []);

  return (
    <>
      <div className="w-full py-3 flex justify-between items-center">
        <div className="text-lg font-bold">
          <h3>Account Balance</h3>
          <h3 className="text-3xl">
            ${balance ? balance?.toLocaleString() : 0}
          </h3>
        </div>
      </div>
    </>
  );
};

export default MyBalance;
