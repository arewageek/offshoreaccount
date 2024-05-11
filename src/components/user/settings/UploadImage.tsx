"use client";

import { ResetUserPassword } from "@/lib/actions/profileActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  image: z.string({
    required_error: "You need to select an image",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const UploadImage = () => {
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
    const imageUploaded = null;

    if (imageUploaded === "success") toast.success("Password has been reset");
    else if (imageUploaded === "incorrectPassword")
      toast.error("Incorrect Password Provided");
    else if (imageUploaded === "notFound") toast.error("Account not found");
    else if (imageUploaded === "unknownError")
      toast.error("An unknown error occurred");
  };

  return (
    <form
      onSubmit={handleSubmit(ResetPassword)}
      className="grid gap-3 p-5 lg:p-10 rounded-lg bg-white shadow"
    >
      <div className="grid gap-0 mb-5">
        <h3 className="font-bold text-2xl">Upload Image</h3>
        <span className="text-xs font-light">
          Let's change your profile image
        </span>
      </div>

      <div className="gap-5 flex">
        <Input
          {...register("image")}
          isInvalid={!!errors.image?.message}
          errorMessage={errors.image?.message}
          type="file"
          size="sm"
        />
        <Button
          type="submit"
          className="text-white bg-green-600 px-10 h-full"
          isLoading={isSubmitting}
        >
          <FaCloudUploadAlt className="text-4xl" />
        </Button>
      </div>
    </form>
  );
};

export default UploadImage;
