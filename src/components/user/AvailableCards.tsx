import { FaCcMastercard, FaCcVisa, FaCreditCard } from "react-icons/fa";

export const AvailableCards = () => {
  const cards = [
    {
      balance: 98500,
      currency: "usd",
      digits: 4141,
      type: "mastercard",
    },
    {
      balance: 76280,
      currency: "eur",
      digits: 8345,
      type: "visa",
    },
  ];

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
              <span className="text-sm font-[450]">...{card.digits}</span>
              <span className="text-3xl text-green-950">
                {card.type == "mastercard" ? (
                  <FaCcVisa />
                ) : card.type == "mastercard" ? (
                  <FaCcMastercard />
                ) : (
                  <FaCreditCard />
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
