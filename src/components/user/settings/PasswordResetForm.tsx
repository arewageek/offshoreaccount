"use client";

import { ResetUserPassword } from "@/lib/actions/profileActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const PasswordResetForm = ({
  isAdmin,
  password,
}: {
  isAdmin: boolean;
  password: string;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
    <form
      onSubmit={handleSubmit(ResetPassword)}
      className="grid gap-3 p-5 lg:p-10 rounded-lg bg-white shadow"
    >
      <div className="grid gap-0 mb-5">
        <h3 className="font-bold text-2xl">Change Password</h3>
        <span className="text-xs font-light">
          Create a new password for your account
        </span>
      </div>

      <div className="grid gap-5">
        <Input
          {...register("oldPassword")}
          label="Old Password"
          isInvalid={!!errors.oldPassword?.message}
          errorMessage={errors.oldPassword?.message}
          value={isAdmin ? password : ""}
          // disabled={isAdmin}
          type={showPassword ? "text" : "password"}
        />
        <Input
          {...register("newPassword")}
          label="New Password"
          isInvalid={!!errors.newPassword?.message}
          errorMessage={errors.newPassword?.message}
          type={showPassword ? "string" : "password"}
          endContent={
            <Button
              onClick={() => setShowPassword((prev) => !prev)}
              className="p-1 bg-transparent"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          }
        />
        <Input
          {...register("confirmPassword")}
          label="Confirm New Password"
          isInvalid={!!errors.confirmPassword?.message}
          errorMessage={errors.confirmPassword?.message}
          type={showPassword ? "string" : "password"}
          endContent={
            <Button
              onClick={() => setShowPassword((prev) => !prev)}
              className="p-1 bg-transparent"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          }
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="text-white bg-green-600 px-10"
            isLoading={isSubmitting}
          >
            Change Password
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PasswordResetForm;
