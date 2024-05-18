"use client";

import { useState } from "react";
import Modal from "../Modal";
import { Button, Input } from "@nextui-org/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransaction } from "@/lib/actions/transactonsAction";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const FormSchema = z.object({
  accountName: z.string().min(3, "Name too short"),
  accountNumber: z.string().min(8, "Invalid account number"),
  bankName: z.string().min(4, "Bank Name too short"),
  routingNumber: z.string().min(3, "Invalid Routing Number"),
  swiftCode: z.string().min(8, "Invalid Swift Code"),
  amount: z.string().min(1, "Invalid Amoount"),
});

type InputType = z.infer<typeof FormSchema>;

export const QuickTransfer = () => {
  const [showModal, setShowModal] = useState(false);

  const { data } = useSession();

  function closeModal() {
    setShowModal(false);
    return false;
  }

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });

  const handleTransfer: SubmitHandler<InputType> = async (input) => {
    // const transferred = await createTransaction({
    //   user: data?.user.id,
    //   accountName: input.accountName,
    //   accountNumber: input.accountNumber,
    //   bankName: input.bankName,
    //   routingNumber: input.routingNumber,
    //   swiftCode: input.swiftCode,
    //   amount: input.amount as unknown as number,
    // });

    // if (!transferred) {
    //   toast.error("Failed to complete tranaction");
    //   return;
    // }

    toast.success("Transaction Initiated");
    setShowModal(true);
  };

  return (
    <div>
      <div className="rounded-3xl bg-green-100 flex flex-col space-y-5 px-2.5 lg:px-6 lg:py-20 py-5">
        <form onSubmit={handleSubmit(handleTransfer)}>
          <div className="bg-green-300 py-5 lg:py-10 px-5 rounded-3xl grid gap-4">
            <h4 className="font-bold text-lg">Quick Transfer</h4>

            <Input
              {...register("accountName")}
              label="Account Name"
              size="sm"
              errorMessage={errors.accountName?.message}
              isInvalid={!!errors.accountName?.message}
            />
            <Input
              {...register("accountNumber")}
              label="Account Number"
              size="sm"
              errorMessage={errors.accountNumber?.message}
              isInvalid={!!errors.accountNumber?.message}
            />
            <Input
              {...register("bankName")}
              label="Bank Name"
              size="sm"
              isInvalid={!!errors.bankName?.message}
              errorMessage={errors.bankName?.message}
            />
            <Input
              {...register("routingNumber")}
              label="Routing Number"
              size="sm"
              errorMessage={errors.routingNumber?.message}
              isInvalid={!!errors.routingNumber?.message}
            />
            <Input
              {...register("swiftCode")}
              label="Swift Code"
              size="sm"
              errorMessage={errors.swiftCode?.message}
              isInvalid={!!errors.swiftCode?.message}
            />
            <Input
              {...register("amount")}
              label="Amount"
              size="lg"
              type="number"
              startContent="$"
              errorMessage={errors.amount?.message}
              isInvalid={!!errors.amount?.message}
            />

            <div className="flex lg:gap-5 gap-3 flex-col lg:flex-row">
              <Button
                type="submit"
                className="text-white bg-black text-xs w-full font-bold"
              >
                Send Money
              </Button>

              <Button
                type="button"
                className="bg-white text-black text-xs w-full font-bold"
              >
                Save Draft
              </Button>
            </div>
          </div>
        </form>
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
