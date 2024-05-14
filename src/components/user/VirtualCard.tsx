import React from "react";

type Card = {
  cardName: string | undefined;
  cardNumber: string | undefined;
  expire: string | undefined;
  cvv: string | undefined;
  balance: number | undefined;
  currency: string | undefined;
};

export const VirtualCard = async ({
  expire,
  cardName,
  cardNumber,
  cvv,
  balance,
  currency,
}: Card) => {
  const card: Card = {
    cardName: cardName,
    expire: expire,
    cardNumber: cardNumber,
    cvv: cvv,
    balance,
    currency,
  };

  return (
    <div className="w-[200pt] lg:w-[260pt] h-[190px] lg:h-[250px] m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105">
      <img
        className="relative object-cover w-full h-full rounded-xl "
        src="https://i.imgur.com/kGkSg1v.png"
      />

      <div className="w-full lg:px-8 px-4 absolute top-6 flex flex-col space-y-0 lg:space-y-4">
        <div className="flex justify-between">
          <div className="">
            <p className="font-light text-sm lg:text-lg">Name</p>
            <p className="font-medium tracking-widest text-sm lg:text-lg">
              {card?.cardName}
            </p>
          </div>
          <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
        </div>
        <div className="pt-0">
          <p className="font-light text-sm lg:text-lg">Card Number</p>
          <p className="font-medium tracking-more-wider text-sm lg:text-lg">
            {card?.cardNumber}
          </p>
        </div>
        <div className="pt-4 pr-6">
          <div className="flex justify-between">
            <div className="">
              <p className="font-light text-xs">Balance</p>
              <p className="font-medium tracking-wider text-[10pt] lg:text-sm uppercase">
                {card?.balance?.toLocaleString()} {card?.currency}
              </p>
            </div>

            <div className="">
              <p className="font-light text-xs">Expiry</p>
              <p className="font-medium tracking-wider text-[10pt] lg:text-sm">
                {card?.expire}
              </p>
            </div>

            <div className="">
              <p className="font-light text-xs">CVV</p>
              <p className="font-bold tracking-more-wider text-[10pt] lg:text-sm">
                {card.cvv}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
