import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaCoins, FaCouch, FaFile, FaFileAlt } from "react-icons/fa";

export const UpcomingPayments = ({
  count,
  sideBtn,
}: {
  count: number;
  sideBtn: boolean;
}) => {
  const payments = [
    {
      icon: <FaCoins />,
      title: "Salary",
      type: "Regular Payment",
      amount: 4500,
    },
    {
      icon: <FaCouch />,
      title: "Salary",
      type: "Regular Payment",
      amount: 1800,
    },
  ];
  return (
    <div className="w-full h-full flex flex-wrap lg:flex-wrap flex-col lg:flex-row gap-5">
      {payments.map(
        (item, index) =>
          index < count && (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`w-full lg:w-[130pt] bg-green-300 pt-6 pb-5 px-6 rounded-2xl flex flex-col items-start space-y-4`}
              >
                <div className="text-3xl rounded-2xl px-3 py-3 bg-black text-white hidden lg:block">
                  {item.icon}
                </div>

                <div className="">
                  <div className="text-sm">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-[9pt] font-light">{item.type}</p>
                  </div>
                </div>
                <div className="font-bold text-2xl text-green-950">
                  ${item.amount.toLocaleString()}
                </div>
              </div>

              {sideBtn && (
                <Link
                  href="/user/payments"
                  className="bg-green-300 text-black p-3 rounded-full"
                >
                  <FaFileAlt />
                </Link>
              )}
            </div>
          )
      )}
    </div>
  );
};
