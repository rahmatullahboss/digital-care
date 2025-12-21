"use client";

import { FaRocket, FaClock, FaChartLine, FaHeadset, FaShieldHalved, FaUsers } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import { useTranslations } from "next-intl";

export default function WhyUsSection() {
  const t = useTranslations("WhyUs");

  const reasons = [
    {
      icon: <FaRocket className="text-2xl" />,
      title: t("reasons.fastResults.title"),
      description: t("reasons.fastResults.description"),
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: t("reasons.automation.title"),
      description: t("reasons.automation.description"),
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: t("reasons.dataDecisions.title"),
      description: t("reasons.dataDecisions.description"),
    },
    {
      icon: <FaHeadset className="text-2xl" />,
      title: t("reasons.support.title"),
      description: t("reasons.support.description"),
    },
    {
      icon: <FaShieldHalved className="text-2xl" />,
      title: t("reasons.secure.title"),
      description: t("reasons.secure.description"),
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: t("reasons.trackRecord.title"),
      description: t("reasons.trackRecord.description"),
    },
  ];

  return (
    <section id="why-us" className="section-shell section-shell-dark py-24">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          kicker={t("kicker")}
          title={t("title")}
          description={t("description")}
          variant="dark"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {reasons.map((reason) => (
            <GlassCard key={reason.title} variant="dark" className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-300 mb-6">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{reason.title}</h3>
              <p className="text-slate-300 leading-relaxed">{reason.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
