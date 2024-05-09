"use client";

import { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

interface Props {
  title: string;
  message: string;
  visible: boolean;
  close: () => void;
}

const Modal = ({ title, message, visible, close }: Props) => {
  const closeModal = () => close();

  return (
    <div
      className={`${
        visible ? "fixed" : "hidden"
      } w-screen h-screen backdrop-blur-sm top-0 left-0 p-10 flex justify-center items-center bg-black/35 z-50`}
    >
      <div className="px-10 py-5 w-full lg:w-1/3 rounded-lg shadow-lg bg-white divide-y-2">
        <div className="w-full flex justify-between items-center py-3">
          <div>{title}</div>
          <div>
            <button onClick={() => closeModal()}>
              <FaTimesCircle />
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center py-10 text-xs lg:text-sm">
          <div className="text-center">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
