"use client";
// import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import SignIn from "./auth/signin/page";
import { UserInterface } from "@/interfaces";
import { getCurrentUser } from "@/api/users";

type tokenType = {
  value: string | null;
  loading: boolean;
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [signed, setSigned] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("No access token found");

        const data: UserInterface = await getCurrentUser(token);
        if (data.isAdmin) {
          setSigned(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("🚀 ~ getUser ~ error:", error);
      }
    };

    getUser();
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {loading ? <Loader /> : signed ? children : <SignIn />}
      </body>
    </html>
  );
}
