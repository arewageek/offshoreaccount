"use client";

import {
  updateCardBalanceAction,
  UpdateProfileAsAdmin,
} from "@/lib/actions/profileActions";
import { updateTrx } from "@/lib/actions/transactonsAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  amount: z.string(),
});

type InputType = z.infer<typeof FormSchema>;

const CreditCardEdit = ({
  balance,
  id,
}: {
  balance: number | undefined;
  id: string | undefined;
}) => {
  const router = useRouter();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const updateCardBalance: SubmitHandler<InputType> = async (data) => {
    const balanceUpdated = await updateCardBalanceAction({
      amount: Number(data.amount),
      id: id as string,
    });

    if (balanceUpdated == "success") {
      toast.success("Card has been updated");
      router.refresh();
      return;
    }
    toast.error("Failed to update card balance");
    router.refresh();
    return;
  };

  return (
    <form
      onSubmit={handleSubmit(updateCardBalance)}
      className="grid gap-3 p-5 lg:p-10 rounded-lg bg-white shadow"
    >
      <div className="grid gap-0 mb-5">
        <h3 className="font-bold text-2xl">Card Balance</h3>
        <span className="text-xs font-light">
          Update balance for the credit card
        </span>
      </div>

      <div className="grid gap-5">
        <div className="flex gap-3 items-center">
          <Input
            {...register("amount")}
            label="Card Balance"
            type="number"
            isInvalid={!!errors.amount?.message}
            errorMessage={errors.amount?.message}
            defaultValue={balance as unknown as string | undefined}
            variant="underlined"
          />

          <div className="flex justify-end py-3 h-full">
            <Button
              type="submit"
              variant="shadow"
              isLoading={isSubmitting}
              className="text-white bg-green-600 px-10 h-full"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreditCardEdit;
