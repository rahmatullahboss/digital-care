"use client";

import { useTranslations, useLocale } from "next-intl";
import { Service, FAQ, PricingPackage, Job } from "@/lib/db";

// Extended service type with parsed features/benefits (used after JSON.parse)
interface ParsedService extends Omit<Service, 'features' | 'benefits'> {
  features: string[];
  benefits: string[];
}

// Hook to translate database content based on current locale
export function useTranslateDbContent() {
  const locale = useLocale();
  const t = useTranslations("DatabaseContent");

  // If Bengali (default), return original content
  // If English, return translated content from JSON (with fallback to original)

  const translateService = <T extends Service | ParsedService>(service: T): T => {
    if (locale === "bn") return service;
    
    // Check if translation exists using raw access
    const titleKey = `services.${service.id}.title` as const;
    const hasTranslation = t.has(titleKey);
    
    if (!hasTranslation) return service;
    
    // Check if features and benefits translations exist
    const featuresKey = `services.${service.id}.features` as const;
    const benefitsKey = `services.${service.id}.benefits` as const;
    const hasFeatures = t.has(featuresKey);
    const hasBenefits = t.has(benefitsKey);
    
    // Get translated features/benefits
    const translatedFeatures = hasFeatures 
      ? t.raw(`services.${service.id}.features`)
      : service.features;
    const translatedBenefits = hasBenefits 
      ? t.raw(`services.${service.id}.benefits`)
      : service.benefits;
    
    return {
      ...service,
      title: t(`services.${service.id}.title`),
      tagline: t(`services.${service.id}.tagline`),
      description: t(`services.${service.id}.description`),
      features: translatedFeatures,
      benefits: translatedBenefits,
    } as T;
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
    
    // Check if features translation exists
    const featuresKey = `pricing.${pkg.id}.features` as const;
    const hasFeatures = t.has(featuresKey);
    
    return {
      ...pkg,
      name: t(`pricing.${pkg.id}.name`),
      description: t(`pricing.${pkg.id}.description`),
      // Use translated features if available
      features: hasFeatures 
        ? t.raw(`pricing.${pkg.id}.features`) as PricingPackage['features']
        : pkg.features,
    };
  };

  const translateJob = (job: Job): Job => {
    if (locale === "bn") return job;
    
    // Check if translation exists
    const titleKey = `jobs.${job.id}.title` as const;
    const hasTranslation = t.has(titleKey);
    
    if (!hasTranslation) return job;
    
    // Check if responsibilities and requirements translations exist
    const responsibilitiesKey = `jobs.${job.id}.responsibilities` as const;
    const requirementsKey = `jobs.${job.id}.requirements` as const;
    const hasResponsibilities = t.has(responsibilitiesKey);
    const hasRequirements = t.has(requirementsKey);
    
    return {
      ...job,
      title: t(`jobs.${job.id}.title`),
      department: t.has(`jobs.${job.id}.department`) ? t(`jobs.${job.id}.department`) : job.department,
      type: t.has(`jobs.${job.id}.type`) ? t(`jobs.${job.id}.type`) : job.type,
      location: t.has(`jobs.${job.id}.location`) ? t(`jobs.${job.id}.location`) : job.location,
      description: t.has(`jobs.${job.id}.description`) ? t(`jobs.${job.id}.description`) : job.description,
      salary_range: t.has(`jobs.${job.id}.salary_range`) ? t(`jobs.${job.id}.salary_range`) : job.salary_range,
      responsibilities: hasResponsibilities 
        ? t.raw(`jobs.${job.id}.responsibilities`) as string[]
        : job.responsibilities,
      requirements: hasRequirements 
        ? t.raw(`jobs.${job.id}.requirements`) as string[]
        : job.requirements,
    };
  };

  return {
    locale,
    translateService,
    translateFaq,
    translatePricing,
    translateJob,
    translateServices: <T extends Service | ParsedService>(services: T[]) => services.map(s => translateService(s)),
    translateFaqs: (faqs: FAQ[]) => faqs.map(translateFaq),
    translatePricings: (packages: PricingPackage[]) => packages.map(translatePricing),
    translateJobs: (jobs: Job[]) => jobs.map(translateJob),
  };
}
