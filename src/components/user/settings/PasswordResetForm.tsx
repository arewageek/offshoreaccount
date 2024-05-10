"use client";

import { ResetUserPassword } from "@/lib/actions/profileActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  oldPassword: z.string({
    required_error: "You need to enter previous password",
  }),
  newPassword: z.string().min(8, "Password too short"),
  confirmPassword: z.string().min(8, "Password too short"),
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
  };

  return (
    <form onSubmit={handleSubmit(ResetPassword)}>
      <Input
        {...register("oldPassword")}
        label="Old Password"
        isInvalid={!!errors.oldPassword?.message}
        errorMessage={errors.oldPassword?.message}
      />
      <Input
        {...register("newPassword")}
        label="New Password"
        isInvalid={!!errors.newPassword?.message}
        errorMessage={errors.newPassword?.message}
      />
      <Input
        {...register("confirmPassword")}
        label="Confirm New Password"
        isInvalid={!!errors.confirmPassword?.message}
        errorMessage={errors.confirmPassword?.message}
      />

      <Button type="submit" color="primary" isLoading={isSubmitting}>
        Change Password
      </Button>
    </form>
  );
};

export default PasswordResetForm;
