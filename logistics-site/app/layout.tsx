import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSEOData } from "@/lib/seo";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

const defaultSEO = getSEOData("home");

export const metadata: Metadata = {
  title: defaultSEO.title,
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  robots: defaultSEO.robots,
  openGraph: {
    title: defaultSEO.ogTitle || defaultSEO.title,
    description: defaultSEO.ogDescription || defaultSEO.description,
    type: defaultSEO.ogType || "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}




