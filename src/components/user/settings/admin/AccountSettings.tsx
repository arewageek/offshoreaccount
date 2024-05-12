"use client";

import {
  ResetUserPassword,
  UpdateProfileAsAdmin,
} from "@/lib/actions/profileActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  firstName: z.string().min(3, "Name too short"),
  lastName: z.string().min(3, "Name too short"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string(),
});

type InputType = z.infer<typeof FormSchema>;

const AccountSettings = ({
  firstName,
  lastName,
  phone,
  email,
}: {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string | null;
}) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const passedData = { data: { user: { firstName, lastName, email, phone } } };

  const { data } = passedData ? passedData : useSession();

  useEffect(() => {
    if (data?.user) {
      const { firstName, lastName, email, phone } = data?.user;

      console.log({ firstName, lastName, email, phone });
    }
  }, [data]);

  const UpdateProfile: SubmitHandler<InputType> = async (input) => {
    const profileUpdated = await UpdateProfileAsAdmin({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
    });

    if (profileUpdated === "success")
      toast.success(
        `${input.firstName} ${input.lastName}'s profile has been updated`
      );
    else if (profileUpdated === "unknownError")
      toast.error("An unknown error occurred");
  };

  return (
    <form
      onSubmit={handleSubmit(UpdateProfile)}
      className="grid gap-3 p-5 lg:p-10 rounded-lg bg-white shadow"
    >
      <div className="grid gap-0 mb-5">
        <h3 className="font-bold text-2xl">Account Settings</h3>
        <span className="text-xs font-light">
          Here you can change your account information
        </span>
      </div>

      <div className="grid gap-5">
        <Input
          {...register("firstName")}
          label="First Name"
          isInvalid={!!errors.firstName?.message}
          errorMessage={errors.firstName?.message}
          defaultValue={firstName as string | undefined}
          variant="flat"
        />

        <Input
          {...register("lastName")}
          label="Last Name"
          isInvalid={!!errors.lastName?.message}
          errorMessage={errors.lastName?.message}
          defaultValue={lastName as string | undefined}
        />
        <Input
          {...register("email")}
          label="Email Address"
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message}
          defaultValue={email as string | undefined}
        />
        <Input
          {...register("phone")}
          label="Phone Number"
          isInvalid={!!errors.phone?.message}
          errorMessage={errors.phone?.message}
          defaultValue={phone as string | undefined}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
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

export default AccountSettings;
