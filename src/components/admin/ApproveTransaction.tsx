"use client";

import { trxStatusUpdate } from "@/lib/actions/transactonsAction";
import { Badge, Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ApproveTransaction = ({
  image,
  firstName,
  lastName,
  role,
  id,
  status,
}: {
  image: string;
  role: string;
  lastName: string;
  firstName: string;
  id: string;
  status: string;
}) => {
  const router = useRouter();

  const updateTrx = async (status: "confirm" | "decline") => {
    const updated = await trxStatusUpdate({ id: id, status });

    if (updated == "success") {
      toast.success("Transaction has been confirmed");
    } else {
      toast.success("Transaction has been declined");
    }

    router.refresh();
  };

  return (
    <div className="bg-white shadow p-4 lg:p-3 rounded-t-xl lg:pb-10">
      <div
        className="w-full h-[70pt] p-4 rounded-t-xl bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/src/usercard.avif')",
          backgroundSize: "center",
          backgroundPosition: "center",
        }}
      >
        <div>
          <div className="rounded-full absolute overflow-hidden w-70 h-70 object-fill -bottom-5 w-full flex justify-center">
            <Image
              src={image || "/src/personguy.jpg"}
              width={70}
              height={70}
              alt="User Profile"
              className="object-fill rounded-full -ml-8 p-1 bg-white"
            />
          </div>
        </div>
      </div>
      <div className="relative w-full mt-5 text-center lg:py-2 py-5">
        <h3 className="font-bold text-2xl">
          {firstName} {lastName}
        </h3>
        <span className="text-sm italic">
          <span className="font-bold">Account Type:</span>{" "}
          {role == "user" ? "Customer" : "Administrator"}
        </span>
      </div>

      <div className="mt-5 flex flex-col justify-center items-center">
        <div className="py-3">
          <div
            className={`bg-${
              status == "confirm"
                ? "green"
                : status == "decline"
                ? "red"
                : "orange"
            }-300 font-bold text-xs capitalize p-1 px-3 rounded-full`}
          >
            Status: {status}
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-row gap-3">
          <Button
            size="sm"
            variant="shadow"
            color="success"
            className="font-[450]"
            type="button"
            onClick={() => updateTrx("confirm")}
            disabled={status == "confirm"}
          >
            Confirm
          </Button>

          <Button
            size="sm"
            variant="shadow"
            color="danger"
            className="font-[450]"
            type="button"
            onClick={() => updateTrx("decline")}
            disabled={status == "decline"}
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApproveTransaction;
