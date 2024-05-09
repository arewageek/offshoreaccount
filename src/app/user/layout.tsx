import React from "react";
import { TopNav } from "@/components/user/TopNav";
import { Sidenav } from "@/components/user/SideNav";

interface Props {
  children: React.ReactNode;
}

function UserLayouts({ children }: Props) {
  return (
    <div className="px-4 md:px-7 py-5 md:py-10 max-w-screen bg-white text-gray-800 min-h-screen">
      <div className="w-full md:flex md:justify-end">
        <div className="w-full md:w-[80%] items-center">
          <TopNav />
        </div>
      </div>
      <div className="w-full flex justify-between flex-col md:flex-row">
        <div className="w-[250pt] md:w-[15%] px-5 py-3 relative">
          <Sidenav />
        </div>
        <div className="w-full lg:px-10 py-3">{children}</div>
      </div>
    </div>
  );
}

export default UserLayouts;
