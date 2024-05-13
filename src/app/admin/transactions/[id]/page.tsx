import ApproveTransaction from "@/components/admin/ApproveTransaction";
import TransactionDetails from "@/components/admin/TransactionDetails";
import { getUserData } from "@/lib/actions/profileActions";
import { getTranaction } from "@/lib/actions/transactonsAction";

const UserAccountSettings = async (id: { params: { id: string } }) => {
  const user = await getUserData({ id: id.params.id });
  const transaction = await getTranaction({ id: id.params.id });

  console.log({ user, transaction });

  const { firstName, lastName, email, phone, image, role, password } = user;
  const {
    accountName,
    accountNumber,
    bankName,
    routingNumber,
    swiftCode,
    amount,
  } = transaction;

  return (
    <main className="w-full lg:px-10 lg:py-20 py-10 rounded-3xl flex flex-wrap">
      <div className="w-full lg:w-full px-3 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 grid gap-10 h-fit">
          <ApproveTransaction
            firstName={firstName as string}
            lastName={lastName as string}
            role={role as string}
            image={image as string}
            id={id.params.id}
          />
        </div>

        <div className="w-full lg:w-1/2 grid gap-10">
          <TransactionDetails
            accountName={accountName}
            accountNumber={accountNumber}
            bankName={bankName}
            routingNumber={routingNumber}
            swiftCode={swiftCode}
            amount={amount}
          />
        </div>
      </div>
    </main>
  );
};

export default UserAccountSettings;
