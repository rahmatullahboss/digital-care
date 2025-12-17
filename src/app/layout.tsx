import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ডিজিটাল কেয়ার সলিউশনস | ব্যবসা প্রতিষ্ঠানের জন্য আধুনিক ডিজিটাল মার্কেটিং",
  description: "ব্যবসা প্রতিষ্ঠানের জন্য AI-নির্ভর ডিজিটাল মার্কেটিং, ২৪/৭ সেলস মেশিন ওয়েবসাইট, স্বয়ংক্রিয় লিড জেনারেশন ও কখনো লিড হারাবেন না AI এজেন্ট",
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className={`${hindSiliguri.variable} font-sans bg-gray-50 text-gray-800 antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
