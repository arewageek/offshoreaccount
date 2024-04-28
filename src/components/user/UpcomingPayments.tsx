import React from "react";
import { FaCoins, FaCouch } from "react-icons/fa";

export const UpcomingPayments = ({ cols = 2, count = 2 }) => {
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
            <div
              key={index}
              className={`w-full lg:w-1/${cols} bg-green-300 pt-2 pb-5 px-6 rounded-2xl flex flex-col items-start space-y-7`}
            >
              <div className="text-4xl rounded-2xl px-3 py-3 bg-transparent text-transparent hidden lg:block">
                {item.icon}
              </div>

              <div className="">
                <div className="text-sm">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-[9pt] font-light">{item.type}</p>
                </div>
              </div>
              <div className="font-bold text-3xl text-green-950">
                ${item.amount.toLocaleString()}
              </div>
            </div>
          )
      )}
    </div>
  );
};
