import React from "react";
import { FaCoins, FaCouch, FaFile, FaFileAlt } from "react-icons/fa";

export const UpcomingPayments = ({ count }: { count: number }) => {
  const payments = [
    {
      icon: <FaCouch />,
      title: "Freelance",
      type: "Unrgular Payment",
      amount: 1500,
    },
    {
      icon: <FaCoins />,
      title: "Salary",
      type: "Regular Payment",
      amount: 4500,
    },
    {
      icon: <FaCoins />,
      title: "Salary",
      type: "Regular Payment",
      amount: 4000,
    },
    {
      icon: <FaCoins />,
      title: "Salary",
      type: "Regular Payment",
      amount: 2100,
    },
  ];
  return (
    <div className="w-full h-full flex flex-wrap lg:flex-nowrap flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0">
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

              {count <= 2 && (
                <button className="bg-green-300 text-black p-3 rounded-full">
                  <FaFileAlt />
                </button>
              )}
            </div>
          )
      )}
    </div>
  );
};
