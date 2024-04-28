import { VirtualCard } from "@/components/user/VirtualCard";
import { QuickTransfer } from "@/components/user/QuickTransfer";
import { RecentTrxs } from "@/components/user/RecentTrxs";
import { UpcomingPayments } from "@/components/user/UpcomingPayments";
import React from "react";

const Dashboard = () => {
  return (
    <main className="w-full bg-gray-50 lg:p-5 p-2 rounded-3xl flex flex-wrap">
      <div className="w-full md:w-full lg:w-3/4 px-3 lg:pr-20 lg:pl-4">
        <div className="w-full h-fit flex flex-wrap flex-col md:flex-row">
          <div className="w-full h-fit md:w-full lg:w-1/2 lg:px-8 py-3">
            <div className="mb-10 my-2">
              <h4 className="font-bold">Dashboard</h4>
            </div>
            <VirtualCard />
          </div>

          <div className="w-full h-fit md:w-full lg:w-1/2 lg:px-8 py-3">
            <div className="mb-10 my-2">
              <h4 className="font-bold">Upcoming Payments</h4>
            </div>
            <UpcomingPayments />
          </div>

          <div className="w-full lg:px-8 py-3">
            <RecentTrxs />
          </div>
        </div>
      </div>

      <div className="w-full md:w-full lg:w-1/4">
        <QuickTransfer />
      </div>
    </main>
  );
};

export default Dashboard;
