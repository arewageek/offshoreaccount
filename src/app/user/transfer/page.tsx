import { QuickTransfer } from "@/components/user/QuickTransfer";
import React from "react";

const page = () => {
  return (
    <main className="w-full bg-green-100 lg:px-10 p-2 lg:py-20 py-10 rounded-3xl flex flex-wrap">
      <div className="w-full px-3">
        <div className="w-full h-fit flex flex-wrap flex-col md:flex-row">
          <div className="w-full md:w-full lg:w-3/5 lg:px-4">
            <QuickTransfer />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
