"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { FaAt, FaEye, FaEyeSlash, FaUserLock } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z
    .string({ required_error: "You have to enter an email address" })
    .email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter a valid password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const SigninForm = (props: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState();
  const [session, setSession] = useState<any>({});

  const { data } = useSession();

  useEffect(() => {
    setSession(data?.user);
  }, [authenticated, data]);

  const router = useRouter();

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) });

  const handleSignin: SubmitHandler<InputType> = async (data) => {
    console.log({ data });

    const authenticate = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    try {
      if (!authenticate?.ok) {
        console.log(authenticate?.error);
        // toast.error("An error occurred while authenticating");
        toast.error(authenticate?.error);
        return false;
      }

      if (session?.role) {
        toast.success("Signed in successfully!");
        const { role } = session;
        console.log(role);

        if (role == "admin") router.push("/admin/");
        else router.push("/user/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Oops! Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignin)} className="grid gap-y-4">
      <Input
        {...register("email")}
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        label="Email Address"
        placeholder="email@sample.com"
        startContent={<FaAt className="w-10" />}
      />

      <Input
        {...register("password")}
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        label="Password"
        placeholder="Password"
        startContent={<FaUserLock className="w-4" />}
        endContent={
          <Button
            onClick={() => setShowPassword((prev) => !prev)}
            className="p-1 bg-transparent"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        }
        type={showPassword ? "text" : "password"}
      />

      <Button
        type="submit"
        color="success"
        isLoading={isSubmitting}
        className="py-7 w-full font-bold"
        variant="shadow"
      >
        Sign Me In
      </Button>
    </form>
  );
};

export default SigninForm;
