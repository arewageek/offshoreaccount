"use client";
import { useEffect, useState } from "react";
import { FaBell, FaList } from "react-icons/fa";
import { MobileNav } from "./MobileNav";
import { useSession } from "next-auth/react";

export const TopNav = () => {
  const [showSidenav, setShowSidenav] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("sidenavvisibility", `${showSidenav}`);
  }, [showSidenav]);

  const { data } = useSession();

  const profileImage = !data?.user.image && "/default.jpg";

  return (
    <>
      <div className="w-full flex justify-between items-center px-5 space-x-10">
        <div className="flex justify-start space-x-5 items-center">
          <div
            className="w-10 h-10 bg-white rounded-full shadow"
            style={{
              background: `url('${profileImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="flex justify-center items-center h-full text-xl">
            <button className="">
              <FaBell />
            </button>
          </div>
        </div>

        <div
          className="lg:hidden"
          onClick={() => setShowSidenav((prev) => !prev)}
        >
          <FaList />
        </div>
      </div>

      {showSidenav && <MobileNav />}
    </>
  );
};
