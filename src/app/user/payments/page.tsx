import { RecentTrxs } from "@/components/user/RecentTrxs";
import { UpcomingPayments } from "@/components/user/UpcomingPayments";

const PaymentsPage = () => {
  return (
    <main className="w-full bg-green-50 p-5 rounded-3xl flex">
      <div className="w-full lg:w-3/4 px-3 md:pr-20 md:pl-4">
        <div className="w-full h-fit flex flex-wrap flex-col md:flex-row">
          <div className="w-full lg:w-3/4 h-fit px-4 py-3">
            <div className="mb-10 my-2">
              <h4 className="font-bold">Upcoming Payments</h4>
            </div>
            <UpcomingPayments sideBtn={false} count={4} />
          </div>

          <div className="w-full px-8 py-3">
            <RecentTrxs />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentsPage;
