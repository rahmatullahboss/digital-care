import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { ChatBot } from "@/components/chat/ChatBot";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ডিজিটাল কেয়ার সলিউশনস | ওয়েবসাইট, ওয়েব অ্যাপ ও মোবাইল অ্যাপ ডেভেলপমেন্ট",
  description: "কাস্টম ওয়েবসাইট, ওয়েব অ্যাপ্লিকেশন, মোবাইল অ্যাপ এবং সব ধরনের প্রোগ্রামিং সলিউশন। আধুনিক প্রযুক্তি দিয়ে আপনার ব্যবসাকে ডিজিটাল করুন।",
  icons: {
    icon: "/favicon.webp",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${hindSiliguri.variable} ${inter.variable} ${locale === "en" ? "font-inter" : "font-sans"} bg-gray-50 text-gray-800 antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingButtons />
          <ChatBot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

