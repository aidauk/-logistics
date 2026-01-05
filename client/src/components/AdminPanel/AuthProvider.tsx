"use client";
import { useReset } from "@/hooks/useReset";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // useReset()
  // console.log(1)
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
