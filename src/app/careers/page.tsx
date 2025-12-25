"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { FaBolt, FaLightbulb, FaRocket, FaUsers, FaArrowRight, FaWhatsapp, FaXmark } from "react-icons/fa6";
import { useState } from "react";

export default function CareersPage() {
  const t = useTranslations("CareersPage");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cvLink: "",
    message: ""
  });

  const values = [
    {
      key: "innovation",
      icon: <FaLightbulb className="w-8 h-8 text-teal-500" />,
    },
    {
      key: "growth",
      icon: <FaRocket className="w-8 h-8 text-sky-500" />,
    },
    {
      key: "teamwork",
      icon: <FaUsers className="w-8 h-8 text-emerald-500" />,
    },
  ];

  const jobs = [
    "social_media_entry",
  ];

  const handleApply = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setFormStatus("idle");
  };

  const closeVal = () => {
    setSelectedJob(null);
    setFormStatus("idle");
    setFormData({ name: "", email: "", phone: "", cvLink: "", message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("idle");

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          position: selectedJob,
          cv_link: formData.cvLink
        }),
      });

      if (response.ok) {
        setFormStatus("success");
        setTimeout(() => {
          closeVal();
        }, 3000);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="hero-gradient absolute inset-0 opacity-50 pointer-events-none" />
        <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-teal-700 shadow-sm backdrop-blur">
              <FaBolt className="text-teal-500" />
              {t("badge")}
            </span>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#positions" icon={<FaArrowRight />}>
              {t("openPositions.applyBtn")}
            </Button>
            <Button 
              href="https://wa.me/8801570260118" 
              variant="secondary"
              className="!bg-emerald-50 !text-emerald-700 hover:!bg-emerald-100 border-emerald-200"
              icon={<FaWhatsapp className="text-emerald-600" />}
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-6">
          <SectionHeader
            title={t("values.title")}
            centered
            className="mb-12"
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <GlassCard key={v.key} className="p-8 text-center" hover={true}>
                <div className="flex justify-center mb-6 p-4 bg-slate-50 rounded-full w-20 h-20 mx-auto items-center shadow-sm">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {t(`values.${v.key}.title`)}
                </h3>
                <p className="text-slate-600">
                  {t(`values.${v.key}.description`)}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
           <SectionHeader
            kicker={t("kicker")}
            title={t("openPositions.title")}
            description={t("openPositions.description")}
            centered
            className="mb-16"
          />

          <div className="grid gap-6 max-w-4xl mx-auto">
            {jobs.length > 0 ? (
              jobs.map((jobKey) => {
                const responsibilities = t.raw(`openPositions.jobs.${jobKey}.responsibilities`) as string[];
                const requirements = t.raw(`openPositions.jobs.${jobKey}.requirements`) as string[];

                return (
                  <GlassCard key={jobKey} className="p-6 md:p-8" hover={true}>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                           {t(`openPositions.jobs.${jobKey}.title`)}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-4">
                          <span className="bg-slate-100 px-3 py-1 rounded-full">
                             {t(`openPositions.jobs.${jobKey}.department`)}
                          </span>
                          <span className="bg-slate-100 px-3 py-1 rounded-full">
                             {t(`openPositions.jobs.${jobKey}.type`)}
                          </span>
                          <span className="bg-slate-100 px-3 py-1 rounded-full">
                             {t(`openPositions.jobs.${jobKey}.location`)}
                          </span>
                        </div>
                        <p className="text-slate-600 mb-6 max-w-2xl">
                          {t(`openPositions.jobs.${jobKey}.description`)}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleApply(t(`openPositions.jobs.${jobKey}.title`))}
                        className="inline-flex items-center justify-center rounded-full bg-teal-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/30 whitespace-nowrap"
                      >
                         {t("openPositions.applyBtn")}
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Responsibilities:</h4>
                        <ul className="list-disc list-inside space-y-2 text-slate-600">
                          {Array.isArray(responsibilities) && responsibilities.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Requirements:</h4>
                        <ul className="list-disc list-inside space-y-2 text-slate-600">
                           {Array.isArray(requirements) && requirements.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                );
              })
            ) : (
                <div className="text-center py-10">
                    <p className="text-slate-500">{t("openPositions.noOpenings")}</p>
                </div>
            )}
            
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900">
                {t("applicationForm.title")} <span className="text-teal-600 block text-sm font-normal mt-1">{selectedJob}</span>
              </h3>
              <button onClick={closeVal} className="text-slate-400 hover:text-slate-600 transition-colors">
                <FaXmark className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 md:p-8">
              {formStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBolt className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{t("applicationForm.success")}</h4>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t("applicationForm.name")}</label>
                    <input 
                      required
                      type="text" 
                      placeholder={t("applicationForm.namePlaceholder")}
                      className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t("applicationForm.email")}</label>
                    <input 
                      required
                      type="email" 
                      placeholder={t("applicationForm.emailPlaceholder")}
                      className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t("applicationForm.phone")}</label>
                    <input 
                      required
                      type="tel" 
                      placeholder={t("applicationForm.phonePlaceholder")}
                      className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t("applicationForm.cvLink")}</label>
                    <input 
                      type="text" 
                      placeholder={t("applicationForm.cvPlaceholder")}
                      className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                      value={formData.cvLink}
                      onChange={(e) => setFormData({...formData, cvLink: e.target.value})}
                    />
                    <p className="text-xs text-slate-500 mt-1">{t("applicationForm.cvHelp")}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t("applicationForm.message")}</label>
                    <textarea 
                      rows={3}
                      placeholder={t("applicationForm.messagePlaceholder")}
                      className="w-full rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  {formStatus === "error" && (
                    <p className="text-red-500 text-sm">{t("applicationForm.error")}</p>
                  )}

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t("applicationForm.submitting") : t("applicationForm.submit")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* General CTA */}
      <section className="py-16">
        <GlassCard className="container mx-auto px-6 max-w-4xl p-12 text-center bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-none shadow-xl" variant="dark" hover={false}>
             <h2 className="text-3xl font-bold mb-4 text-white">
                 {t("cta.title")}
             </h2>
             <p className="text-teal-100 mb-8 max-w-xl mx-auto">
                 {t("cta.description")}
             </p>
             <Button href="mailto:rahmatullahzisan@gmail.com?subject=General Application" className="bg-white text-teal-600 hover:bg-teal-50 border-none">
                 {t("cta.btn")}
             </Button>
        </GlassCard>
      </section>
    </div>
  );
}
