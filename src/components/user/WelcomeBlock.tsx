"use client";

import { useSession } from "next-auth/react";

const WelcomeBlock = () => {
  const { data } = useSession();

  return (
    <div className="lg:px-8 w-full mb-6">
      <div className="text-2xl font-[450]">Welcome</div>
      <div className="font-bold text-3xl">
        {data?.user.firstName} {data?.user.lastName}
      </div>
    </div>
  );
};

export default WelcomeBlock;
