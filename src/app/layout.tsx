import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import AuthProvders from "@/components/providers/AuthProvders";
import AppWrapper from "@/components/providers/AppWrapper";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={`${inter.className}`}>
          <AuthProvders>{children}</AuthProvders>
          <ToastContainer />
        </body>
      </html>
    </AppWrapper>
  );
}
