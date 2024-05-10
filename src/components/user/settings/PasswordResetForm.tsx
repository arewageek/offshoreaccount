"use client";

import { ResetUserPassword } from "@/lib/actions/profileActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z
  .object({
    oldPassword: z.string({
      required_error: "You need to enter previous password",
    }),
    newPassword: z.string().min(8, "Password too short"),
    confirmPassword: z.string().min(8, "Password too short"),
  })
  .refine((data) => data.newPassword === data.oldPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const PasswordResetForm = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const { data } = useSession();

  const ResetPassword: SubmitHandler<InputType> = async (input) => {
    const passwordResetStatus = await ResetUserPassword({
      email: data?.user.email,
      oldPassword: input.oldPassword,
      newPassword: input.newPassword,
    });

    if (passwordResetStatus === "success")
      toast.success("Password has been reset");
    else if (passwordResetStatus === "incorrectPassword")
      toast.error("Incorrect Password Provided");
    else if (passwordResetStatus === "notFound")
      toast.error("Account not found");
    else if (passwordResetStatus === "unknownError")
      toast.error("An unknown error occurred");
  };

  return (
    <form onSubmit={handleSubmit(ResetPassword)} className="grid gap-3">
      <Input
        {...register("oldPassword")}
        label="Old Password"
        isInvalid={!!errors.oldPassword?.message}
        errorMessage={errors.oldPassword?.message}
        type="password"
      />
      <Input
        {...register("newPassword")}
        label="New Password"
        isInvalid={!!errors.newPassword?.message}
        errorMessage={errors.newPassword?.message}
        type="password"
      />
      <Input
        {...register("confirmPassword")}
        label="Confirm New Password"
        isInvalid={!!errors.confirmPassword?.message}
        errorMessage={errors.confirmPassword?.message}
        type="password"
      />

      <Button type="submit" color="success" isLoading={isSubmitting}>
        Change Password
      </Button>
    </form>
  );
};

export default PasswordResetForm;
