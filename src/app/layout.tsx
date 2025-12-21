import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import ChatWidget from "@/components/ui/ChatWidget";
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
  title: "ডিজিটাল কেয়ার সলিউশনস | ব্যবসা প্রতিষ্ঠানের জন্য আধুনিক ডিজিটাল মার্কেটিং",
  description: "ব্যবসা প্রতিষ্ঠানের জন্য AI-নির্ভর ডিজিটাল মার্কেটিং, ২৪/৭ সেলস মেশিন ওয়েবসাইট, স্বয়ংক্রিয় লিড জেনারেশন ও কখনো লিড হারাবেন না AI এজেন্ট",
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
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

