"use client";

import { getTrxFromClient } from "@/lib/actions/getDataFromClient";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export const RecentTrxs = () => {
  const { data } = useSession();
  const user = data?.user;

  const [trxs, setTrxs] = useState<
    {
      id: string;
      user: string;
      desc: string;
      accountName: string;
      accountNumber: string;
      bankName: string;
      routingNumber: string;
      swiftCode: string;
      amount: number;
      createAt: Date;
      status: string;
      currency: string;
    }[]
  >([]);

  const getTrx = async () => {
    const transactions = await getTrxFromClient({ user: user?.id });
    setTrxs(await transactions);
    console.log(transactions);
  };

  useEffect(() => {
    user && getTrx();
  }, [user]);

  return (
    <div className="lg:my-20 my-5">
      <div className="w-full flex flex-wrap justify-between items-center space-y-5 lg:space-y-0">
        <div className="w-full lg:w-auto">
          <h3 className="text-[10pt] lg:text-[13pt] font-bold">
            Recent Transactions
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto w-full py-5 pr-2">
        <table className="table table-auto w-full font-[450]">
          <tbody>
            {trxs.length > 0 ? (
              trxs.map((trx, index) => (
                <tr
                  key={index}
                  className={`${
                    index != trxs.length - 1 && "border-b-4"
                  } py-5 border-slate-200 text-slate-800`}
                >
                  <td className="py-5 pr-4">
                    <div className="flex items-center w-fit capitalize">
                      {trx?.desc}
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center w-fit text-slate-600">
                      {trx.createAt.toDateString()}
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center w-fit font-bold text-slate-700">
                      {trx.currency == "USD" ? "$" : "¥"}{" "}
                      {trx.amount.toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="py-3 text-center font-bold">
                  No transaction
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
