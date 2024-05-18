"use client";
import { getCards } from "@/lib/actions/profileActions";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";

export const AvailableCards = () => {
  const [cards, setCards] = useState<
    {
      id: string;
      user: string;
      cardNumber: string;
      cardName: string;
      provider: string;
      cvv: string;
      expireDate: string;
      currency: string;
      balance: number;
    }[]
  >([]);

  const { data } = useSession();

  const getMyCards = async () => {
    const bothCards = await getCards({
      id: data?.user?.id as string,
    });
    // console.log(bothCards);
    setCards(bothCards);
  };

  useEffect(() => {
    data?.user.id != undefined && getMyCards();
    console.log({ cards, id: data?.user.id });
  }, [data?.user]);

  return (
    <div className="w-full px-2 py-2">
      <div className="w-full flex justify-between items-center">
        <span className="text-lg font-bold text-green-950">
          Available Cards
        </span>

        <span className="text-[9pt] font-light">View all</span>
      </div>

      <div className="mt-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-full py-7 px-6 rounded-3xl bg-green-200 flex justify-between my-3"
          >
            <div className="flex items-center space-x-3">
              <span className="font-bold text-2xl text-green-950">
                {card.balance.toLocaleString()}
              </span>
              <span className="text-[9pt] font-[400] text-green-950 uppercase">
                {card.currency}
              </span>
            </div>

            <div className="flex justify-around items-center space-x-6">
              <span className="text-sm font-[450]">
                {card.cardNumber.slice(0, 4)}...{card.cardNumber.slice(-5)}
              </span>
              <span className="text-3xl text-green-950">
                <FaCcVisa />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
