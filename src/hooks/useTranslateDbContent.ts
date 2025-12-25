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

  // For jobs: database stores Bengali in _bn columns, English in regular columns
  // When locale is Bengali, use _bn fields; when English, use regular fields
  const translateJob = (job: Job): Job => {
    if (locale === "bn") {
      // Bengali locale: use _bn fields from database, fallback to regular fields
      return {
        ...job,
        title: job.title_bn || job.title,
        department: job.department_bn || job.department,
        type: job.type_bn || job.type,
        location: job.location_bn || job.location,
        description: job.description_bn || job.description,
        salary_range: job.salary_range_bn || job.salary_range,
        responsibilities: job.responsibilities_bn?.length > 0 ? job.responsibilities_bn : job.responsibilities,
        requirements: job.requirements_bn?.length > 0 ? job.requirements_bn : job.requirements,
      };
    }
    
    // English locale: use regular fields (which contain English content)
    return {
      ...job,
      title: job.title,
      department: job.department,
      type: job.type,
      location: job.location,
      description: job.description,
      salary_range: job.salary_range,
      responsibilities: job.responsibilities,
      requirements: job.requirements,
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
