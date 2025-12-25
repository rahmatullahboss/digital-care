"use client";

import { FaPhone } from "react-icons/fa";
import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import { ChatBot } from "@/components/chat/ChatBot";

export default function FloatingButtons() {
  const t = useTranslations("FloatingButtons");

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  };

  return (
    <>
      <div className="fixed right-5 bottom-5 flex flex-col gap-3 z-[10000]">
        <a
          href="tel:01570260118"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-semibold text-white text-sm shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl bg-gradient-to-r from-teal-600 to-teal-500"
          aria-label={t("callNow")}
        >
          <FaPhone className="text-base" />
          <span>{t("callNow")}</span>
        </a>
        <button
          onClick={openChatbot}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-semibold text-white text-sm shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl bg-gradient-to-r from-amber-500 to-rose-500"
          aria-label={t("messageUs")}
        >
          <Bot className="text-base" />
          <span>{t("messageUs")}</span>
        </button>
      </div>
      <ChatBot />
    </>
  );
}
