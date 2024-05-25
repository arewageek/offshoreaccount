"use client";

import React, { useState } from "react";
import { FaPenAlt } from "react-icons/fa";
import UpdateBalanceForm from "./UpdateBalanceForm";

const UserBalanceContent = ({
  balance,
  id,
}: {
  balance: number | undefined;
  id: string | undefined;
}) => {
  const [edit, setEdit] = useState(false);

  return (
    <>
      <div className="w-full py-3 flex justify-between items-center">
        <div className="text-lg font-bold">
          <h3>Account Balance</h3>
          <h3 className="text-3xl">${balance?.toLocaleString()}</h3>
        </div>

        <div className="flex p-4 justify-center items-center">
          <button className="bg-green-400 hover:bg-green-500 transition w-fit h-fit rounded-full p-3">
            <FaPenAlt onClick={() => setEdit((prev) => !prev)} />
          </button>
        </div>
      </div>
      <div className="w-full py-4">{edit && <UpdateBalanceForm id={id} />}</div>
    </>
  );
};

export default UserBalanceContent;
