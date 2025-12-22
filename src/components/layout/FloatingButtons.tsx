"use client";

import { FaPhone } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export default function FloatingButtons() {
  const t = useTranslations("FloatingButtons");

  return (
    <div className="fixed right-5 bottom-5 flex flex-col gap-3 z-[10000]">
      <a
        href="tel:01570260118"
        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-semibold text-white text-sm shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl bg-gradient-to-r from-teal-600 to-teal-500"
        aria-label={t("callNow")}
      >
        <FaPhone className="text-base" />
        <span>{t("callNow")}</span>
      </a>
      <a
        href="https://wa.me/8801739416661"
        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-semibold text-white text-sm shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl bg-gradient-to-r from-green-600 to-green-500"
        aria-label={t("messageUs")}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="text-base" />
        <span>{t("messageUs")}</span>
      </a>
    </div>
  );
}
