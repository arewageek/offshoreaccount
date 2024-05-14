import ApproveTransaction from "@/components/admin/ApproveTransaction";
import TransactionDetails from "@/components/admin/TransactionDetails";
import { getUserData } from "@/lib/actions/profileActions";
import { getTranaction } from "@/lib/actions/transactonsAction";

const UserAccountSettings = async (id: { params: { id: string } }) => {
  const trx = await getTranaction({ id: id.params.id });
  const userId = trx?.user;
  const user = await getUserData({ id: userId as string });

  return (
    <main className="w-full lg:px-10 lg:py-20 py-10 rounded-3xl flex flex-wrap">
      <div className="w-full lg:w-full px-3 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 grid gap-10 h-fit">
          <ApproveTransaction
            firstName={user?.firstName as string}
            lastName={user?.lastName as string}
            role={user?.role as string}
            image={user?.image as string}
            id={id.params.id}
            status={trx?.status as string}
          />
        </div>

        <div className="w-full lg:w-1/2 grid gap-10">
          <TransactionDetails
            accountName={trx?.accountName}
            accountNumber={trx?.accountNumber}
            bankName={trx?.bankName}
            routingNumber={trx?.routingNumber}
            swiftCode={trx?.swiftCode}
            amount={Number(trx?.amount)}
            id={id.params.id}
          />
        </div>
      </div>
    </main>
  );
};

export default UserAccountSettings;
