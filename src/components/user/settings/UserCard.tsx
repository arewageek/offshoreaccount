"use client";

import { getUserData } from "@/lib/actions/profileActions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const UserCard = ({
  firstName,
  lastName,
  image,
  role,
}: {
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  role: string | null;
}) => {
  return (
    <div className="bg-white shadow p-4 lg:p-3 rounded-t-xl">
      <div
        className="w-full h-[70pt] p-4 rounded-t-xl bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/src/usercard.avif')",
          backgroundSize: "center",
          backgroundPosition: "center",
        }}
      >
        <div>
          <div className="rounded-full absolute overflow-hidden w-70 h-70 object-fill -bottom-5 w-full flex justify-center">
            <Image
              src={"/src/personguy.jpg"}
              width={70}
              height={70}
              alt="User Profile"
              className="object-fill rounded-full -ml-8 p-1 bg-white"
            />
          </div>
        </div>
      </div>
      <div className="relative w-full mt-5 text-center lg:py-2 py-5">
        <h3 className="font-bold text-2xl">
          {firstName} {lastName}
        </h3>
        <span className="text-sm italic">
          <span className="font-bold">Account Type:</span>{" "}
          {role == "user" ? "Customer" : "Administrator"}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
