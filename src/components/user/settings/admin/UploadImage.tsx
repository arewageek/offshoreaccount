"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const UploadImage = ({ email }: { email: string }) => {
  const [file, setFile] = useState<File>();

  const UploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please attach a file first");
      return;
    }

    const data = new FormData();
    data.set("file", file);
    data.set("email", email);

    try {
      const upload = await fetch("/api/upload", { method: "POST", body: data });

      if (!upload.ok) {
        toast.error("Could not upload file");
        console.log(await upload.text());
      }

      toast.success("File uploaded successfully");
    } catch (e) {
      console.log(e);
      toast.error("An unknown error occurred");
    }
  };

  // const UploadViaAction = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const didUpload = await ImageUpload({ email, file });

  //   console.log(file, didUpload);
  // };

  return (
    <form
      onSubmit={UploadFile}
      className="grid gap-3 p-5 lg:p-10 rounded-lg bg-white shadow"
    >
      <div className="grid gap-0 mb-5">
        <h3 className="font-bold text-2xl">Upload Image</h3>
        <span className="text-xs font-light">
          Let's change your profile image
        </span>
      </div>

      <div className="gap-5 flex flex-col lg:flex-row">
        <input
          type="file"
          name="image"
          onChange={(e) => setFile(e.target.files?.[0])}
          className="py-4 px-3 border-1"
        />
        <Button type="submit" className="text-white bg-green-600 px-10 h-full">
          <FaCloudUploadAlt className="text-4xl" />
        </Button>
      </div>
    </form>
  );
};

export default UploadImage;
