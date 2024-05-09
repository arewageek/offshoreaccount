import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import AuthProvders from "@/components/providers/AuthProvders";
import AppWrapper from "@/components/providers/AppWrapper";

export const metadata: Metadata = {
  title: "Offshore Account",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppWrapper>
      <html lang="en">
        <body>
          <AuthProvders>{children}</AuthProvders>
          <ToastContainer />
        </body>
      </html>
    </AppWrapper>
  );
}
