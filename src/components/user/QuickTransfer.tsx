"use client";

import { useState } from "react";
import { FaCaretDown, FaCcMastercard, FaPaperPlane } from "react-icons/fa";
import { AvailableCards } from "./AvailableCards";
import Modal from "../Modal";

export const QuickTransfer = () => {
  const [showModal, setShowModal] = useState(false);

  function handleTransfer() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    return false;
  }

  return (
    <div>
      <h3 className="font-bold text-[15pt] text-gray-800 mb-5">
        Quick transfer
      </h3>

      <div className="rounded-3xl bg-green-100 flex flex-col space-y-5 px-6 py-20">
        <form action={handleTransfer}>
          <div className="py-3 flex flex-col space-y-3">
            <div className="w-full flex items-center space-x-3">
              <input
                type="tel"
                name="account"
                className="text-xs font-[450] px-5 py-3 border-2 border-gray-200 bg-gray-50 text-gray-600 placeholder:text-gray-400 w-full rounded-xl"
                placeholder="Account Number"
              />

              <button
                type="submit"
                className="px-5 py-3 rounded-lg bg-green-900/90 text-sm text-green-50 hover:bg-black transition duration-300"
              >
                <FaPaperPlane />
              </button>
            </div>

            <div className="w-full">
              <div className="rounded-xl border-2 border-gray-300 px-5 py-3 flex justify-between items-center text-[9pt]">
                <div className="flex items-center space-x-2">
                  <span>
                    <FaCcMastercard />
                  </span>
                  <span>Debit</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span>$10.432</span>
                  <span>
                    <FaCaretDown />
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="w-full flex items-center space-x-3">
              <div className="text-[8.5pt] font-[450] h-[60pt] px-5 py-5 border-2 border-gray-200 bg-gray-50 text-gray-600  w-full rounded-xl">
                <label htmlFor="#amount">Account Number ($)</label>
                <input
                  type="tel"
                  name="amount"
                  className="h-full w-full text-lg font-bold text-gray-900 bg-transparent"
                  placeholder="$124"
                />
              </div>
            </div> */}

            <div className="w-full flex justify-center space-x-3 font-bold text-sm">
              <button
                type="submit"
                className="bg-green-950 text-green-50 px-4 py-2 w-full shadow-md rounded-lg hover:bg-green-300 border-2 border-green-950 hover:text-green-950 transition duration-300"
              >
                Send Money
              </button>

              <button className="bg-green-50 text-green-950 px-4 py-2 w-full shadow-md rounded-lg hover:bg-green-300 border-2 border-green-950 hover:text-green-950 transition duration-300">
                Save as Draft
              </button>
            </div>
          </div>
        </form>

        <div>
          <AvailableCards />
        </div>
      </div>

      <Modal
        title="Transaction Pending"
        message="Please contact customer support to get your soft token"
        visible={showModal}
        close={closeModal}
      />
    </div>
  );
};
