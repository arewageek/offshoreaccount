"use client";

import { updateBalance } from "@/lib/actions/profileActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRocket } from "react-icons/fa6";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  amount: z
    .string({ required_error: "You need to enter an amount" })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected Number, string given",
    }),
});

type InputType = z.infer<typeof FormSchema>;

const UpdateBalanceForm = ({ id }: { id: string | undefined }) => {
  const router = useRouter();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });

  const balanceUpdate: SubmitHandler<InputType> = async (data) => {
    const update = await updateBalance({
      id,
      amount: data.amount as unknown as number,
    });

    if (update == "failed") {
      toast.error("Failed to update user's balance");
    } else if (update == "success") {
      toast.success("User's balance has been updated");
      router.refresh();
    } else {
      toast.error("An unknown error occurred");
    }

    return;
  };

  return (
    <form onSubmit={handleSubmit(balanceUpdate)}>
      <div className="flex gap-3 items-center">
        <Input
          {...register("amount")}
          errorMessage={errors.amount?.message}
          isInvalid={!!errors.amount}
          label="Amount"
          className="h-fit"
          type="number"
        />
        <div className="h-full">
          <Button
            isLoading={isSubmitting}
            variant="shadow"
            type="submit"
            color="success"
            className="rounded-lg"
          >
            <FaRocket />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateBalanceForm;
