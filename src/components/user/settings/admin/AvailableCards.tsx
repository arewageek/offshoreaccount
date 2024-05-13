import { getCards } from "@/lib/actions/profileActions";
import { Button } from "@nextui-org/react";
import {
  FaCcMastercard,
  FaCcVisa,
  FaCreditCard,
  FaFileAlt,
} from "react-icons/fa";

export const AvailableCards = async ({ user }: { user: string }) => {
  const cards = await getCards({ id: user });

  return (
    <div className="w-full px-2 py-2">
      <div className="w-full flex justify-between items-center">
        <span className="text-lg font-bold text-green-950">
          Available Cards
        </span>

        <span className="text-[9pt] font-light">View all</span>
      </div>

      <div className="mt-5">
        {cards != "userNotFound" &&
          cards != "noValidCardsFound" &&
          cards.map((card, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-full py-7 px-6 rounded-3xl bg-green-200 flex justify-between my-3">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-2xl text-green-950">
                    {card.balance.toLocaleString()}
                  </span>
                  <span className="text-[9pt] font-[400] text-green-950 uppercase pr-4 pl-2">
                    {card.currency}
                  </span>
                </div>

                <div className="flex justify-around items-center gap-6">
                  <span className="text-sm font-[450]">
                    ...{card.cardNumber.slice(-5)}
                  </span>
                  <span className="text-3xl text-green-950">
                    {card.provider == "mastercard" ? (
                      <FaCcVisa />
                    ) : card.provider == "mastercard" ? (
                      <FaCcMastercard />
                    ) : (
                      <FaCreditCard />
                    )}
                  </span>
                </div>
              </div>

              <div className="h-fit w-fit flex justify-center items-center">
                <div className="rounded-full text-sm p-3 bg-green-300 text-black hover:bg-green-400 cursor-pointer transition">
                  <FaFileAlt />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
