"use client";

import { useTranslations, useLocale } from "next-intl";
import { Service, FAQ, PricingPackage } from "@/lib/db";

// Hook to translate database content based on current locale
export function useTranslateDbContent() {
  const locale = useLocale();
  const t = useTranslations("DatabaseContent");

  // If Bengali (default), return original content
  // If English, return translated content from JSON (with fallback to original)

  const translateService = (service: Service): Service => {
    if (locale === "bn") return service;
    
    // Check if translation exists using raw access
    const titleKey = `services.${service.id}.title` as const;
    const hasTranslation = t.has(titleKey);
    
    if (!hasTranslation) return service;
    
    return {
      ...service,
      title: t(`services.${service.id}.title`),
      tagline: t(`services.${service.id}.tagline`),
      description: t(`services.${service.id}.description`),
    };
  };

  const translateFaq = (faq: FAQ): FAQ => {
    if (locale === "bn") return faq;
    
    // Check if translation exists
    const questionKey = `faqs.${faq.id}.question` as const;
    const hasTranslation = t.has(questionKey);
    
    if (!hasTranslation) return faq;
    
    return {
      ...faq,
      question: t(`faqs.${faq.id}.question`),
      answer: t(`faqs.${faq.id}.answer`),
    };
  };

  const translatePricing = (pkg: PricingPackage): PricingPackage => {
    if (locale === "bn") return pkg;
    
    // Check if translation exists
    const nameKey = `pricing.${pkg.id}.name` as const;
    const hasTranslation = t.has(nameKey);
    
    if (!hasTranslation) return pkg;
    
    return {
      ...pkg,
      name: t(`pricing.${pkg.id}.name`),
      description: t(`pricing.${pkg.id}.description`),
    };
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
