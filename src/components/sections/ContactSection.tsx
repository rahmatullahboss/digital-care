"use client";

import { useState, FormEvent } from "react";
import { FaEnvelope, FaPhone, FaLocationDot, FaClock } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const t = useTranslations("Contact");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        setFormMessage({ type: "success", text: t("form.success") });
        setFormState({ name: "", phone: "", email: "", message: "" });
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setFormMessage({ type: "error", text: t("form.error") });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-shell section-shell-dark py-24 text-white">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          kicker={t("kicker")}
          kickerIcon={<FaEnvelope className="text-teal-300" />}
          title={t("title")}
          description={t("description")}
          variant="dark"
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
              <span className="w-12 h-12 rounded-full bg-teal-500/30 flex items-center justify-center">
                <FaPhone className="text-teal-300" />
              </span>
              <div>
                <p className="text-sm text-teal-200">{t("phone")}</p>
                <a href="tel:01639590392" className="text-lg font-semibold hover:text-teal-300 transition-colors">01639590392</a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
              <span className="w-12 h-12 rounded-full bg-teal-500/30 flex items-center justify-center">
                <FaEnvelope className="text-teal-300" />
              </span>
              <div>
                <p className="text-sm text-teal-200">{t("email")}</p>
                <a href="mailto:rahmatullahzisan@gmail.com" className="text-lg font-semibold hover:text-teal-300 transition-colors">rahmatullahzisan@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
              <span className="w-12 h-12 rounded-full bg-teal-500/30 flex items-center justify-center">
                <FaLocationDot className="text-teal-300" />
              </span>
              <div>
                <p className="text-sm text-teal-200">{t("address")}</p>
                <p className="text-lg font-semibold">{t("addressValue")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
              <span className="w-12 h-12 rounded-full bg-teal-500/30 flex items-center justify-center">
                <FaClock className="text-teal-300" />
              </span>
              <div>
                <p className="text-sm text-teal-200">{t("schedule")}</p>
                <p className="text-lg font-semibold">{t("scheduleValue")}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">{t("form.name")}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  placeholder={t("form.namePlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">{t("phone")}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  placeholder={t("form.phonePlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">{t("email")}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  placeholder={t("form.emailPlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">{t("form.message")}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
                  placeholder={t("form.messagePlaceholder")}
                />
              </div>

              {formMessage && (
                <p className={`text-sm ${formMessage.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {formMessage.text}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("form.submitting") : t("form.submit")}
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
