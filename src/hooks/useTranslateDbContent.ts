"use client";

import { useTranslations, useLocale } from "next-intl";
import { Service, FAQ, PricingPackage } from "@/lib/db";

// Hook to translate database content based on current locale
export function useTranslateDbContent() {
  const locale = useLocale();
  const t = useTranslations("DatabaseContent");

  // If Bengali (default), return original content
  // If English, return translated content from JSON

  const translateService = (service: Service): Service => {
    if (locale === "bn") return service;
    
    try {
      return {
        ...service,
        title: t(`services.${service.id}.title`),
        tagline: t(`services.${service.id}.tagline`),
        description: t(`services.${service.id}.description`),
      };
    } catch {
      return service; // Fallback to original if translation not found
    }
  };

  const translateFaq = (faq: FAQ): FAQ => {
    if (locale === "bn") return faq;
    
    try {
      return {
        ...faq,
        question: t(`faqs.${faq.id}.question`),
        answer: t(`faqs.${faq.id}.answer`),
      };
    } catch {
      return faq;
    }
  };

  const translatePricing = (pkg: PricingPackage): PricingPackage => {
    if (locale === "bn") return pkg;
    
    try {
      return {
        ...pkg,
        name: t(`pricing.${pkg.id}.name`),
        description: t(`pricing.${pkg.id}.description`),
      };
    } catch {
      return pkg;
    }
  };

  return {
    locale,
    translateService,
    translateFaq,
    translatePricing,
    translateServices: (services: Service[]) => services.map(translateService),
    translateFaqs: (faqs: FAQ[]) => faqs.map(translateFaq),
    translatePricings: (packages: PricingPackage[]) => packages.map(translatePricing),
  };
}
