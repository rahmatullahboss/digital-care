"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import GlassCard from "./GlassCard";
import { useTranslations } from "next-intl";

interface ServiceCardProps {
  href: string;
  icon: ReactNode;
  badge?: string;
  badgeIcon?: ReactNode;
  title: string;
  description: string;
  features?: string[];
  ctaText?: string;
  ctaIcon?: ReactNode;
  className?: string;
}

export default function ServiceCard({
  href,
  icon,
  badge,
  badgeIcon,
  title,
  description,
  features = [],
  ctaText,
  ctaIcon,
  className,
}: ServiceCardProps) {
  const t = useTranslations("Common");
  const displayCtaText = ctaText || t("learnMore");

  return (
    <Link href={href} className={cn("block group", className)}>
        <GlassCard className="p-8 h-full flex flex-col hover:!border-teal-400/40 hover:!shadow-teal-500/20">
        <div className="space-y-4 flex-1">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex items-center justify-center text-teal-600 text-2xl shadow-lg shadow-teal-500/20 group-hover:scale-105 group-hover:-translate-y-0.5 transition-transform duration-300">
            {icon}
          </div>

          {/* Badge */}
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide rounded-full bg-teal-500/10 text-teal-700 border border-teal-300/20">
              {badgeIcon}
              {badge}
            </span>
          )}

          {/* Content */}
          <h3 className="text-xl font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 leading-relaxed">{description}</p>

          {/* Features */}
          {features.length > 0 && (
            <ul className="text-sm text-slate-500 space-y-1.5">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-teal-500 mt-0.5">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6 flex items-center text-teal-600 font-semibold group-hover:gap-2 transition-all">
          {displayCtaText}
          {ctaIcon && <span className="text-sm">{ctaIcon}</span>}
        </div>
      </GlassCard>
    </Link>
  );
}
