"use client";

import { useState, FormEvent } from "react";
import { FaHandHoldingDollar, FaBullhorn, FaHeadset, FaBlog, FaBriefcase, FaUsers, FaHandshakeAngle, FaWandMagicSparkles, FaMessage } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwYe6g5vR8bkpk-I9TZ2_ny18LK943kKjBTd0RiSuL-roumoF4U-pj2_x2fGazBxxhB/exec";

export default function AffiliatePage() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", promotion_strategy: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const t = useTranslations("AffiliatePage");

  const benefits = [
    {
      icon: <FaHandHoldingDollar className="text-2xl" />,
      title: t("benefits.commission.title"),
      description: t("benefits.commission.description"),
    },
    {
      icon: <FaBullhorn className="text-2xl" />,
      title: t("benefits.demand.title"),
      description: t("benefits.demand.description"),
    },
    {
      icon: <FaHeadset className="text-2xl" />,
      title: t("benefits.support.title"),
      description: t("benefits.support.description"),
    },
  ];

  const steps = [
    { number: t("steps.step1.number"), title: t("steps.step1.title"), description: t("steps.step1.description") },
    { number: t("steps.step2.number"), title: t("steps.step2.title"), description: t("steps.step2.description") },
    { number: t("steps.step3.number"), title: t("steps.step3.title"), description: t("steps.step3.description") },
  ];

  const partners = [
    { icon: <FaBlog />, title: t("partners.bloggers.title"), description: t("partners.bloggers.description") },
    { icon: <FaBriefcase />, title: t("partners.agencies.title"), description: t("partners.agencies.description") },
    { icon: <FaUsers />, title: t("partners.consultants.title"), description: t("partners.consultants.description") },
    { icon: <FaHandshakeAngle />, title: t("partners.customers.title"), description: t("partners.customers.description") },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);

    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => formData.append(key, value));
    formData.append("form_type", "affiliate");

    try {
      const response = await fetch(SCRIPT_URL, { method: "POST", body: formData });
      const data = await response.json();
      if (data.result === "success") {
        setFormMessage({ type: "success", text: t("form.success") });
        setFormState({ name: "", email: "", phone: "", promotion_strategy: "" });
      } else { throw new Error(data.message); }
    } catch {
      setFormMessage({ type: "error", text: t("form.error") });
    } finally { setIsSubmitting(false); }
  };

  return (
    <>
      {/* Hero */}
      <section className="hero-section relative py-16 md:py-24">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-teal-700 shadow-sm">
              {t("badge")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900">
              {t("title")}
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto md:mx-0">
              {t("description")}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
              <Button href="#affiliate-form" icon={<FaWandMagicSparkles />}>{t("applyNow")}</Button>
              <Button href="/services" variant="secondary" icon={<FaMessage />}>{t("viewServices")}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-shell py-16">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader title={t("whyJoin")} description={t("whyJoinDesc")} />
          <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
            {benefits.map((b) => (
              <GlassCard key={b.title} className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-teal-500/40 mb-6">{b.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{b.title}</h3>
                <p className="text-slate-600 leading-relaxed">{b.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-shell py-16">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader title={t("howItWorks")} description={t("howItWorksDesc")} />
          <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
            {steps.map((s) => (
              <GlassCard key={s.number} className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-teal-500/40 mb-6">{s.number}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="section-shell py-16">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <SectionHeader title={t("whoCanJoin")} />
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {partners.map((p) => (
              <GlassCard key={p.title} className="p-6 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/40">{p.icon}</div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{p.title}</h3>
                  <p className="text-slate-600">{p.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="affiliate-form" className="section-shell py-16">
        <div className="container mx-auto px-6 relative z-10 max-w-2xl">
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-slate-900">{t("formTitle")}</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("form.name")}</label>
                <input type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder={t("form.namePlaceholder")} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("form.email")}</label>
                <input type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder={t("form.emailPlaceholder")} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("form.phone")}</label>
                <input type="tel" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder={t("form.phonePlaceholder")} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t("form.strategy")}</label>
                <textarea value={formState.promotion_strategy} onChange={(e) => setFormState({ ...formState, promotion_strategy: e.target.value })} rows={4} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none" placeholder={t("form.strategyPlaceholder")} />
              </div>
              {formMessage && <p className={`text-sm ${formMessage.type === "success" ? "text-green-600" : "text-red-600"}`}>{formMessage.text}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? t("form.submitting") : t("form.submit")}</Button>
            </form>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
