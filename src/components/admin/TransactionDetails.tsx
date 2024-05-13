"use client";

import { UpdateProfileAsAdmin } from "@/lib/actions/profileActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  accountName: z.string().min(3, "Name too short"),
  accountNumber: z.string().min(8, "Account Number too short"),
  bankName: z.string().min(4, "Bank Name too short"),
  routingNumber: z.string().min(7, "Invalid Routing Number"),
  swiftCode: z.string().min(7, "Invalid Swift Code"),
  amount: z.number(),
});

type InputType = z.infer<typeof FormSchema>;

const TransactionDetails = ({
  accountName,
  accountNumber,
  bankName,
  routingNumber,
  swiftCode,
  amount,
}: {
  accountName: string | undefined;
  accountNumber: string | undefined;
  bankName: string | undefined;
  routingNumber: string | undefined;
  swiftCode: string | undefined;
  amount: number | undefined;
}) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const updateTransactionData = ({}) => {
    return false;
  };

  return (
    <form
      onSubmit={handleSubmit(updateTransactionData)}
      className="grid gap-3 p-5 lg:p-10 rounded-lg bg-white shadow"
    >
      <div className="grid gap-0 mb-5">
        <h3 className="font-bold text-2xl">Transaction Details</h3>
        <span className="text-xs font-light">
          Here you can change your account information
        </span>
      </div>

      <div className="grid gap-5">
        <div className="flex justify-between flex-col lg:flex-row gap-5">
          <Input
            {...register("accountName")}
            label="Account Name"
            isInvalid={!!errors.accountName?.message}
            errorMessage={errors.accountName?.message}
            defaultValue={accountName as string | undefined}
          />
          <Input
            {...register("accountNumber")}
            label="Account Number"
            isInvalid={!!errors.accountNumber?.message}
            errorMessage={errors.accountNumber?.message}
            defaultValue={accountNumber as string | undefined}
          />
        </div>
        <Input
          {...register("bankName")}
          label="Bank Name"
          isInvalid={!!errors.bankName?.message}
          errorMessage={errors.bankName?.message}
          defaultValue={bankName as string | undefined}
        />

        <div className="flex justify-between flex-col lg:flex-row gap-5">
          <Input
            {...register("routingNumber")}
            label="Routing Number"
            isInvalid={!!errors.routingNumber?.message}
            errorMessage={errors.routingNumber?.message}
            defaultValue={routingNumber as string | undefined}
          />
          <Input
            {...register("swiftCode")}
            label="Swift Code"
            isInvalid={!!errors.swiftCode?.message}
            errorMessage={errors.swiftCode?.message}
            defaultValue={swiftCode as string | undefined}
          />
        </div>
        <Input
          {...register("amount")}
          label="Amount"
          type="number"
          isInvalid={!!errors.amount?.message}
          errorMessage={errors.amount?.message}
          defaultValue={amount as string | undefined}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="shadow"
            isLoading={isSubmitting}
            className="text-white bg-green-600 px-10"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TransactionDetails;
