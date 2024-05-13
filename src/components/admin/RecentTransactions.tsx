import { allTransactionsPerUser } from "@/lib/actions/transactonsAction";
import Link from "next/link";
import React from "react";
import { FaFileAlt } from "react-icons/fa";

const RecentTransactions = ({ id }: { id: string }) => {
  const transactions = allTransactionsPerUser({ user: id });

  console.log(transactions);

  return (
    <div className="mt-10 px-2">
      <h3 className="text-lg font-bold">Recent Transactions</h3>

      <div className="p-3">
        <table className="w-full">
          <tbody>
            <tr className="border-b-2 border-b-green-800/30">
              <td className="py-2 font-bold">Wire Transfer</td>
              <td className="py-2 text-sm">03 Aug 2023</td>
              <td className="py-2 font-bold">$56</td>
              <td className="py-2">
                <div className="flex justify-center items-center w-fit">
                  <div className="flex justify-center items-center w-fit">
                    <Link
                      href={`/admin/transactions/${id}`}
                      className="bg-green-400 text-black p-3 w-fit text-sm rounded-full"
                    >
                      <FaFileAlt />
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
