import React from "react";
import {
  FaBus,
  FaCar,
  FaDumbbell,
  FaGasPump,
  FaPlane,
  FaTaxi,
  FaTrain,
  FaWeight,
} from "react-icons/fa";

export const RecentTrxs = () => {
  const transactions = [
    {
      icon: <FaCar />,
      title: "Taxi Trips",
      date: "09 March, 2024, 15:42",
      amount: 56.5,
    },
  ];

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
            {transactions.map((trx, index) => (
              <tr
                key={index}
                className={`${
                  index != transactions.length - 1 && "border-b-4"
                } py-5 border-slate-200 text-slate-800`}
              >
                <td className="py-5 pr-4">
                  <div className="flex items-center w-fit">{trx.title}</div>
                </td>
                <td className="py-5 px-4">
                  <div className="flex items-center w-fit text-slate-600">
                    {trx.date}
                  </div>
                </td>
                <td className="py-5 px-4">
                  <div className="flex items-center w-fit font-bold text-slate-700">
                    ${trx.amount}
                  </div>
                </td>
                <td className="">
                  <div className="flex items-center space-x-1 h-full">
                    <span className="h-1 w-1 bg-slate-700 rounded-full">
                      &nbsp;
                    </span>
                    <span className="h-1 w-1 bg-slate-700 rounded-full">
                      &nbsp;
                    </span>
                    <span className="h-1 w-1 bg-slate-700 rounded-full">
                      &nbsp;
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
