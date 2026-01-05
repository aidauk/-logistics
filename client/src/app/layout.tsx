import { cn } from "../../utils";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import Filter from "@/components/Filter";
import Navbar from "../components/Navbar";
import AuthProvider from "@/components/AdminPanel/AuthProvider";
import { ReactNode } from "react";
import StoreProvider from "@/redux/StoreProvider";
import "@/styles/globals.css";
import "@/styles/antd.css";
import ShowPath from "@/components/ShowPath";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["100", "200", "300", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dachilla",
  description: "Book, your dream room at your dream cost easily and safely!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "relative w-full h-full font-sans Montserrat",
          montserrat.className
        )}
      >
        <main
          className={cn(
            "relative flex flex-col min-h-screen",
            montserrat.className
          )}
        >
          <StoreProvider>
            <Navbar />
            <Filter />
            <ShowPath />
            <section className="flex-grow flex-1">
              {children}
            </section>
            <Footer />
          </StoreProvider>
        </main>
      </body>
    </html>
  );
}
