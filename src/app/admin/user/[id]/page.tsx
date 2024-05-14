import RecentTransactions from "@/components/admin/RecentTransactions";
import { AvailableCards } from "@/components/user/settings/admin/AvailableCards";
import CreateCardButton from "@/components/user/settings/admin/CreateCardButton";
import { UpcomingPayments } from "@/components/user/UpcomingPayments";
import { getUserData } from "@/lib/actions/profileActions";
import {
  Button,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";

const UserProfile = async (id: { params: { id: string } }) => {
  const user = await getUserData({ id: id.params.id });

  // console.log({ user });

  const plainId = id.params.id;

  return (
    <main className="w-full lg:px-10 lg:py-10 py-10 rounded-3xl flex flex-wrap  bg-green-100">
      <div className="w-full lg:w-full px-3 flex flex-col lg:flex-row gap-10">
        <div className="py-6 lg:py-10 px-10 w-full">
          <div className="flex gap-3 items-center">
            <div>
              <Image
                src={user?.image ? (user?.image as string) : "/default.png"}
                height={60}
                width={60}
                alt={user?.firstName as string}
                className="rounded-full"
              />
            </div>
            <div>
              <span className="font-bold text-sm">Name</span>
              <h2 className="font-bold text-2xl">
                {user?.firstName} {user?.lastName}
              </h2>
            </div>
            <Link href={`/admin/user/${id.params.id}/edit`}>
              <div className="rounded-full p-3 text-xs text-black bg-green-400 ml-3 hover:bg-green-500 transition">
                <FaFileAlt />
              </div>
            </Link>
          </div>

          <div className="flex gap-3 lg:flex-row flex-col mt-10 w-full">
            <div className="lg:w-1/2">
              <div className=" lg:w-3/5">
                <AvailableCards user={id.params.id} />
                <div className="py-3 px-3">
                  <CreateCardButton id={plainId} />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div>
                <h3 className="font-bold text-lg">Upcoming Payments</h3>
                <div className="py-5">
                  <UpcomingPayments count={1} />
                </div>
              </div>
            </div>
          </div>

          <RecentTransactions id={id.params.id} />
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
