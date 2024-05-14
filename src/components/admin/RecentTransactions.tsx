import { allTransactionsPerUser } from "@/lib/actions/transactonsAction";
import Link from "next/link";
import React from "react";
import { FaFileAlt } from "react-icons/fa";

const RecentTransactions = async ({ id }: { id: string }) => {
  const transactions = await allTransactionsPerUser({ user: id });

  //   console.log({ transactions: transactions });
  //   console.log({ loo: transactions[0].desc });

  return (
    <div className="mt-10 px-2">
      <h3 className="text-lg font-bold">Recent Transactions</h3>

      <div className="p-3">
        <table className="w-full">
          <tbody>
            {transactions &&
              transactions.map((trx) => (
                <tr key={trx.id} className="border-b-2 border-b-green-800/30">
                  <td className="py-2 font-bold">
                    {trx.desc || "Wire Transfer "}
                  </td>
                  <td className="py-2 text-sm capitalize">
                    {trx.createAt.toDateString()}
                  </td>
                  <td className="py-2 font-bold">${Number(trx.amount)}</td>
                  <td className="py-2">
                    <div className="flex justify-center items-center w-fit">
                      <div className="flex justify-center items-center w-fit">
                        <Link
                          href={`/admin/transactions/${trx.id}`}
                          className="bg-green-400 text-black p-3 w-fit text-sm rounded-full"
                        >
                          <FaFileAlt />
                        </Link>
                      </div>
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

export default RecentTransactions;
