"use client";

import { ResetUserPassword } from "@/lib/actions/profileActions";
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

const AccountSettings = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const [session, setSession] = useState<any>({});

  const [sfirstName, setFirstName] = useState<string | undefined>("");
  const [slastName, setLastName] = useState<string | undefined>("");
  const [semail, setEmail] = useState<string | undefined>("");
  const [sphone, setPhone] = useState<string | undefined>("");

  const { data } = useSession();

  useEffect(() => {
    if (data?.user) {
      const { firstName, lastName, email, phone } = data?.user;

      console.log({ firstName, lastName, email, phone });

      // setFirstName(firstName || "");
      // setLastName(lastName || "");
      // setEmail(email || "");
      // setPhone(phone || "");
    }
  }, [data]);

  const UpdateProfile: SubmitHandler<InputType> = async (input) => {
    const profileUpdated = null;

    if (profileUpdated === "success") toast.success("Password has been reset");
    else if (profileUpdated === "notFound") toast.error("Account not found");
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
          defaultValue={sfirstName}
          variant="flat"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <Input
          {...register("lastName")}
          label="Last Name"
          isInvalid={!!errors.lastName?.message}
          errorMessage={errors.lastName?.message}
          defaultValue={slastName}
          variant="flat"
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          {...register("email")}
          label="Email Address"
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message}
          defaultValue={semail}
          variant="flat"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          {...register("phone")}
          label="Phone Number"
          isInvalid={!!errors.phone?.message}
          errorMessage={errors.phone?.message}
          defaultValue={sphone}
          variant="flat"
          onChange={(e) => setPhone(e.target.value)}
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
