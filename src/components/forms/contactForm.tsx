"use client";

import { sendMessage } from "@/lib/actions/sendMessageAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaTelegramPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, "The name is too short")
    .max(30, "The name is too long"),
  lastName: z
    .string()
    .min(2, "The name is too short")
    .max(30, "The name is too long"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "The message is too short")
    .max(500, "Message longer than 500 characters"),
});

type InputType = z.infer<typeof FormSchema>;

const ContactForm = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const SendMessage: SubmitHandler<InputType> = async (data) => {
    console.log({ data });
    try {
      const sent = await sendMessage({
        message: data.message,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      sent == "success"
        ? toast.success("Your message has been sent")
        : toast.error("Could not send message");
    } catch (err) {
      console.log(err);
      toast.error("Oops! Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(SendMessage)} className="grid gap-y-4">
      <Input
        label="First Name"
        {...register("firstName")}
        errorMessage={errors.firstName?.message}
        isInvalid={!!errors.firstName}
      />

      <Input
        label="Last Name"
        {...register("lastName")}
        errorMessage={errors.lastName?.message}
        isInvalid={!!errors.lastName}
      />

      <Input
        label="Email"
        {...register("email")}
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
      />

      <Textarea
        placeholder="Type in your message"
        {...register("message")}
        isInvalid={!!errors.message}
        errorMessage={errors.message?.message}
      />

      <div className="mt-10 flex justify-center">
        <Button
          endContent={<FaTelegramPlane />}
          type="submit"
          color="primary"
          className="py-5 px-6 font-bold rounded-none"
          isLoading={isSubmitting}
        >
          Send Message
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
