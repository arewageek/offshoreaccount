import CreditCardEdit from "@/components/admin/CreditCardEdit";
import { VirtualCard } from "@/components/user/VirtualCard";
import { getCardById, getUserData } from "@/lib/actions/profileActions";

const CreditCardInfo = async (id: { params: { id: string } }) => {
  const card = await getCardById({ id: id.params.id });

  return (
    <main className="w-full lg:px-10 lg:py-20 py-10 rounded-3xl flex flex-wrap">
      <div className="w-full lg:w-full px-3 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 grid gap-10 h-fit">
          {/* <UserCard> */}
          <VirtualCard
            cardNumber={card?.cardNumber}
            cardName={card?.cardName}
            expire={card?.expireDate}
            cvv={card?.cvv}
            balance={card?.balance}
            currency={card?.currency}
          />
        </div>

        <div className="w-full lg:w-1/2 grid gap-10">
          <CreditCardEdit balance={card?.balance} id={card?.id} />
        </div>
      </div>
    </main>
  );
};

export default CreditCardInfo;
