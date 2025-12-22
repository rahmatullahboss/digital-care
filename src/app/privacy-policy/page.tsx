"use client";

import { FaWandMagicSparkles, FaMessage } from "react-icons/fa6";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("PrivacyPage");

  const sectionKeys = ["section1", "section2", "section3", "section4", "section5", "section6", "section7", "section8"] as const;

  return (
    <>
      {/* Hero */}
      <section className="hero-section relative py-16 md:py-24">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-teal-700 shadow-sm">
              {t("badge")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900">
              {t("title")}
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              {t("description")}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/services" icon={<FaWandMagicSparkles />}>{t("servicesBtn")}</Button>
              <Button href="/#contact" variant="secondary" icon={<FaMessage />}>{t("contactBtn")}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-shell py-16">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl space-y-6">
          {sectionKeys.map((key) => (
            <GlassCard key={key} className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">{t(`sections.${key}.title`)}</h2>
              <p className="text-slate-600 leading-relaxed">{t(`sections.${key}.content`)}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}
