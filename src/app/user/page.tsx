import { VirtualCard } from "@/components/user/VirtualCard";
import { QuickTransfer } from "@/components/user/QuickTransfer";
import { RecentTrxs } from "@/components/user/RecentTrxs";
import { UpcomingPayments } from "@/components/user/UpcomingPayments";
import React from "react";
import { AvailableCards } from "@/components/user/AvailableCards";
import WelcomeBlock from "@/components/user/WelcomeBlock";
import MyBalance from "@/components/user/MyBalance";

const Dashboard = () => {
  return (
    <main className="w-full bg-green-100 lg:px-10 p-2 lg:py-20 py-10 rounded-3xl flex flex-wrap">
      <div className="w-full px-3">
        <div className="w-full h-fit flex flex-wrap flex-col md:flex-row">
          <WelcomeBlock />

          <div className="w-full h-fit md:w-full lg:w-3/5 lg:px-8 py-3">
            <MyBalance />
          </div>

          <div className="w-full h-fit md:w-full lg:w-3/5 lg:px-8 py-3">
            <AvailableCards />
          </div>

          <div className="w-full h-fit md:w-full lg:w-2/5 lg:pl-2 py-3">
            <div className="mb-10 my-2">
              <h4 className="font-bold">Upcoming Payments</h4>
            </div>
            <UpcomingPayments sideBtn={true} count={2} />
          </div>

          <div className="w-full lg:pl-8 pr-3 py-3">
            <RecentTrxs />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
