"use client";

import { useRouter } from "next/navigation";
import React from "react";

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  router.push("/auth/signin");

  return children;
};

export default AuthRedirect;
