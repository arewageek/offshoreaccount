import { FaCog, FaCreditCard, FaHome, FaUsers } from "react-icons/fa";

import Link from "next/link";

export const Sidenav = () => {
  const links = [
    {
      active: false,
      label: "Home",
      icon: <FaHome />,
      url: "/user",
    },

    {
      label: "Payments",
      icon: <FaCreditCard />,
      url: "/user/payments",
    },

    {
      label: "Customer Care",
      icon: <FaUsers />,
      url: "/user/support",
    },
  ];

  return (
    <div className="h-screen w-[250pt] md:w-[15%] px-5 hidden lg:block fixed left-5 py-3">
      <div className="w-full h-[80%] flex flex-col justify-between text-sm">
        <div className="flex flex-col space-y-4">
          {/* nav */}

          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className={`${
                link.active && "bg-green-300"
              } hover:bg-green-300 transition duration-300 cursor-pointer text-black flex items-center font-[500] rounded-xl px-4 py-3 space-x-5`}
            >
              <div className="text-2xl text-green-700">{link.icon}</div>
              <div>{link.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
