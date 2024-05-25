"use client";
import { useEffect, useState } from "react";
import {
  FaBell,
  FaCog,
  FaDoorClosed,
  FaList,
  FaSignOutAlt,
} from "react-icons/fa";
import { MobileNav } from "./MobileNav";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

export const TopNav = () => {
  const [showSidenav, setShowSidenav] = useState<boolean>(false);
  const [role, setRole] = useState<string>("user");

  useEffect(() => {
    localStorage.setItem("sidenavvisibility", `${showSidenav}`);
  }, [showSidenav]);

  const { data } = useSession();

  const profileImage = data?.user.image || "/default.png";

  useEffect(() => {
    if (data?.user) {
      const { role } = data?.user;
      setRole(role);
    }
  }, [data]);

  const doSignout = async () => {
    const signedOut = await signOut();
    if (signedOut) {
      toast.success("Signed Out successfully");
    } else {
      toast.error("Could not sign you out");
    }

    return;
  };

  return (
    <>
      <div className="w-full flex justify-between items-center px-5 space-x-10 mb-10">
        <div className="flex justify-start space-x-5 items-center">
          <div
            className="w-10 h-10 bg-white rounded-full shadow"
            style={{
              background: `url('${profileImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="flex justify-center items-center h-full text-2xl">
            <Link
              href="/user/settings"
              className="flex justify-center items-center space-x-3"
            >
              <FaCog />
              <span className="text-sm font-bold">Settings</span>
            </Link>
          </div>
        </div>

        <div className="p-3 text-lg">
          <Link
            href="/api/auth/signout"
            className="hover:text-slate-600 transition"
          >
            <FaSignOutAlt onClick={doSignout} />
          </Link>
        </div>

        <div
          className="lg:hidden"
          onClick={() => setShowSidenav((prev) => !prev)}
        >
          <FaList />
        </div>
      </div>

      {showSidenav && <MobileNav format={role} />}
    </>
  );
};
