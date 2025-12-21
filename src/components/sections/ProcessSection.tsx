"use client";

import { FaComments, FaLightbulb, FaCode, FaRocket } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";

export default function ProcessSection() {
  const t = useTranslations("Process");

  const steps = [
    {
      number: t("steps.discussion.number"),
      icon: <FaComments className="text-2xl" />,
      title: t("steps.discussion.title"),
      description: t("steps.discussion.description"),
    },
    {
      number: t("steps.strategy.number"),
      icon: <FaLightbulb className="text-2xl" />,
      title: t("steps.strategy.title"),
      description: t("steps.strategy.description"),
    },
    {
      number: t("steps.implementation.number"),
      icon: <FaCode className="text-2xl" />,
      title: t("steps.implementation.title"),
      description: t("steps.implementation.description"),
    },
    {
      number: t("steps.launch.number"),
      icon: <FaRocket className="text-2xl" />,
      title: t("steps.launch.title"),
      description: t("steps.launch.description"),
    },
  ];

  return (
    <section id="process" className="section-shell py-24">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          kicker={t("kicker")}
          title={t("title")}
          description={t("description")}
        />

        <div className="relative mt-16">
          {/* Process Track Line */}
          <div className="hidden lg:block process-track" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/40">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center text-xs font-bold text-teal-600">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
