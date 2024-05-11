"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const UserCard = () => {
  const { data } = useSession();
  const user = data?.user;

  return (
    <div className="bg-white shadow p-2 lg:p-5">
      <div
        className="w-full h-[70pt] p-4 rounded-t-xl bg-cover bg-center relative"
        style={{ backgroundImage: "url('/src/usercard.avif')" }}
      >
        <div>
          <div className="rounded-full absolute overflow-hidden w-70 h-70 object-fill -bottom-5 w-full flex justify-center">
            <Image
              src={"/src/personguy.jpg"}
              width={70}
              height={70}
              alt="User Profile"
              className="object-fill rounded-full -ml-8"
            />
          </div>
        </div>
      </div>
      <div className="relative w-full mt-5 text-center">
        <h3 className="font-bold text-2xl">
          {user?.firstName} {user?.lastName}
        </h3>
        <span className="text-sm italic">
          <span className="font-bold">Account Type:</span> Customer
        </span>
      </div>
    </div>
  );
};

export default UserCard;
