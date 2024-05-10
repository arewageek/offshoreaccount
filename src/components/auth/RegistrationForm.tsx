"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button, Input } from "@nextui-org/react";
import {
  FaAt,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaPhoneAlt,
  FaUserAlt,
  FaUserLock,
} from "react-icons/fa";
import { createUser } from "@/lib/actions/authAction";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    firstName: z
      .string({ required_error: "Your first name is required" })
      .min(3, "Name is too short")
      .max(30, "Name is too long"),

    lastName: z
      .string()
      .min(3, "Name is too short")
      .max(30, "Name is too long"),
    email: z.string().email("Please enter a valide email"),
    phone: z.string(),
    password: z
      .string()
      .min(6, "Password is too short")
      .max(30, "Password is too long"),
    confirmPassword: z
      .string()
      .min(6, "Password is too short")
      .max(30, "Password is too long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password did not match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const createAccount: SubmitHandler<InputType> = async (data) => {
    const { confirmPassword, ...user } = data;
    try {
      const created = await createUser(user);
      if (created == "success") toast.success("Your account has been created");
      else if (created == "userExist") {
        router.push("/auth/signin");
        toast.error("Seems you already have an account");
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops! Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(createAccount)}
      className="gap-4 flex flex-col"
    >
      <Input
        {...register("firstName")}
        errorMessage={errors.firstName?.message}
        startContent={<FaUserAlt className="w-10" />}
        isInvalid={!!errors.firstName}
        label="First Name"
        placeholder="Please enter your First Name"
      />

      <Input
        {...register("lastName")}
        errorMessage={errors.lastName?.message}
        startContent={<FaUserAlt className="w-10" />}
        isInvalid={!!errors.lastName}
        label="Last Name"
        placeholder="Please enter your Last Name"
      />

      <Input
        {...register("email")}
        errorMessage={errors.email?.message}
        startContent={<FaAt className="w-10" />}
        isInvalid={!!errors.email}
        label="Email Address"
        placeholder="email@sample.com"
      />

      <Input
        {...register("phone")}
        errorMessage={errors.phone?.message}
        startContent={<FaPhoneAlt className="w-10" />}
        isInvalid={!!errors.phone}
        label="Phone Number"
        placeholder="Please enter your phone number"
      />

      <Input
        {...register("password")}
        type={showPassword ? "text" : "password"}
        endContent={
          <button
            type="button"
            className="p-2"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        }
        errorMessage={errors.password?.message}
        startContent={<FaUserLock className="w-10" />}
        isInvalid={!!errors.password}
        label="Password"
        placeholder="Password"
      />

      <Input
        {...register("confirmPassword")}
        type={showPassword ? "text" : "password"}
        endContent={
          <button
            type="button"
            className="p-2"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        }
        errorMessage={errors.confirmPassword?.message}
        startContent={<FaUserLock className="w-10" />}
        isInvalid={!!errors.confirmPassword}
        label="Confirm Password"
        placeholder="Password"
      />

      <Button
        type="submit"
        color="primary"
        isLoading={isSubmitting}
        className="py-7 w-full font-bold"
      >
        Create an Account
      </Button>
    </form>
  );
};
