"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FaGlobe } from "react-icons/fa6";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LanguageSwitcher");
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
      window.location.reload();
    });
  };

  return (
    <div className="relative group">
      <button
        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
          isPending ? "opacity-50" : ""
        } bg-white/80 hover:bg-white border border-gray-200 text-gray-700`}
        disabled={isPending}
      >
        <FaGlobe className="text-teal-500" />
        <span>{locale === "bn" ? "বাং" : "EN"}</span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <button
          onClick={() => switchLocale("bn")}
          className={`w-full px-4 py-2.5 text-left text-sm rounded-t-xl hover:bg-gray-50 transition-colors flex items-center gap-2 ${
            locale === "bn" ? "text-teal-600 font-semibold bg-teal-50" : "text-gray-700"
          }`}
        >
          <span className="text-lg">🇧🇩</span>
          {t("bn")}
        </button>
        <button
          onClick={() => switchLocale("en")}
          className={`w-full px-4 py-2.5 text-left text-sm rounded-b-xl hover:bg-gray-50 transition-colors flex items-center gap-2 ${
            locale === "en" ? "text-teal-600 font-semibold bg-teal-50" : "text-gray-700"
          }`}
        >
          <span className="text-lg">🇺🇸</span>
          {t("en")}
        </button>
      </div>
    </div>
  );
}
