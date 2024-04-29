"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvders = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvders;
