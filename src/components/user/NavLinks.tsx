"use client";

import { FaCreditCard, FaHome, FaUsers } from "react-icons/fa";
import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";

const NavLinks = () => {
  const links = [
    {
      label: "Home",
      icon: <FaHome />,
      path: "/user",
    },

    {
      label: "Payments",
      icon: <FaCreditCard />,
      path: "/user/payments",
    },

    {
      label: "Customer Care",
      icon: <FaUsers />,
      path: "/user/support",
    },
  ];

  const path = usePathname();

  return (
    <div className="flex flex-col space-y-4">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.path}
          className={`${
            path == link.path && "bg-green-300"
          } hover:bg-green-300 transition duration-300 cursor-pointer text-black flex items-center font-[500] rounded-xl px-4 py-3 space-x-5`}
        >
          <div className="text-2xl text-green-700">{link.icon}</div>
          <div>{link.label}</div>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
