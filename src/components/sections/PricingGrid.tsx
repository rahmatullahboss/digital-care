"use client";

import { useState, useMemo } from "react";
import { FaCheck, FaStar, FaGlobe, FaCode, FaMobileAlt, FaDesktop, FaBullhorn } from "react-icons/fa";
import { PricingPackage } from "@/lib/db";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import OrderModal from "@/components/ui/OrderModal";
import { useTranslations, useLocale } from "next-intl";
import { useTranslateDbContent } from "@/hooks/useTranslateDbContent";

interface PricingGridProps {
    packages: PricingPackage[];
}

type Category = "all" | "website" | "webapp" | "mobile" | "software" | "marketing";

// Map package names to categories
function getPackageCategory(packageName: string): Category {
    if (packageName.includes("ওয়েবসাইট")) return "website";
    if (packageName.includes("ওয়েব অ্যাপ")) return "webapp";
    if (packageName.includes("মোবাইল") || packageName.includes("প্ল্যাটফর্ম অ্যাপ")) return "mobile";
    if (packageName.includes("সফটওয়্যার")) return "software";
    if (packageName.includes("মার্কেটিং")) return "marketing";
    return "all";
}

// Check if price is custom/negotiable
function isCustomPrice(price: string): boolean {
    return price === "কাস্টম" || price === "আলোচনা সাপেক্ষে";
}

// Convert Bengali numerals to English numerals for parsing
function bengaliToNumber(bengaliStr: string): number {
    const bengaliDigits: Record<string, string> = {
        '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
        '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
    };
    const englishStr = bengaliStr
        .replace(/,/g, '')
        .split('')
        .map(char => bengaliDigits[char] || char)
        .join('');
    return parseInt(englishStr, 10) || 0;
}

// Format number to Bengali
function toBengaliNumber(num: number): string {
    const englishDigits: Record<string, string> = {
        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
        '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
    };
    return num.toLocaleString('en-IN')
        .split('')
        .map(char => englishDigits[char] || char)
        .join('');
}

// Format price based on locale - converts Bengali numerals to English if needed
function formatPriceForLocale(bengaliPrice: string, locale: string): string {
    if (locale === "bn") return bengaliPrice;
    
    // Convert Bengali numerals to English
    const bengaliDigits: Record<string, string> = {
        '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
        '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
    };
    return bengaliPrice
        .split('')
        .map(char => bengaliDigits[char] || char)
        .join('');
}

export default function PricingGrid({ packages }: PricingGridProps) {
    const [selectedPkg, setSelectedPkg] = useState<PricingPackage | null>(null);
    const [activeCategory, setActiveCategory] = useState<Category>("all");
    const t = useTranslations("Pricing");
    const locale = useLocale();
    const { translatePricings } = useTranslateDbContent();

    // Helper function to format price with locale
    const formatPrice = (price: string) => formatPriceForLocale(price, locale);

    const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
        { id: "all", label: t("categories.all"), icon: null },
        { id: "website", label: t("categories.website"), icon: <FaGlobe /> },
        { id: "webapp", label: t("categories.webapp"), icon: <FaCode /> },
        { id: "mobile", label: t("categories.mobile"), icon: <FaMobileAlt /> },
        { id: "software", label: t("categories.software"), icon: <FaDesktop /> },
        // Marketing category temporarily hidden
        // { id: "marketing", label: t("categories.marketing"), icon: <FaBullhorn /> },
    ];

    const filteredPackages = useMemo(() => {
        // Filter uses original packages (Bengali names for category matching)
        const filtered = activeCategory === "all" 
            ? packages 
            : packages.filter((pkg) => getPackageCategory(pkg.name) === activeCategory);
        // Return translated versions
        return translatePricings(filtered);
    }, [packages, activeCategory, translatePricings]);

    const handleAction = (pkg: PricingPackage) => {
        if (isCustomPrice(pkg.price)) {
            // Navigate to contact section for custom packages
            const contactSection = document.getElementById("contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
            } else {
                window.location.assign("/#contact");
            }
        } else {
            // Open modal for standard packages
            setSelectedPkg(pkg);
        }
    };

    return (
        <>
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.id
                            ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25"
                            : "bg-white/60 text-slate-600 hover:bg-white hover:shadow-md border border-slate-200"
                            }`}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {filteredPackages.map((pkg) => (
                    <GlassCard
                        key={pkg.id}
                        className={`p-8 relative flex flex-col ${pkg.popular ? "ring-2 ring-teal-500" : ""}`}
                    >
                        {pkg.popular === 1 && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-semibold shadow-lg">
                                    <FaStar /> {t("popular")}
                                </span>
                            </div>
                        )}

                        {/* Pricing Display */}
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-slate-900">{pkg.name}</h3>
                            <p className="text-slate-500 mt-1">{pkg.description}</p>
                            
                            {isCustomPrice(pkg.price) ? (
                                <div className="mt-4">
                                    <span className="text-2xl font-bold text-teal-600">{locale === "en" ? "Contact Us" : pkg.price}</span>
                                </div>
                            ) : (
                                <div className="mt-4 space-y-2">
                                    {/* Show total value with strikethrough */}
                                    {pkg.total_value && (
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-lg text-slate-400 line-through">৳{formatPrice(pkg.total_value)}</span>
                                            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                                                {Math.round((1 - bengaliToNumber(pkg.price) / bengaliToNumber(pkg.total_value)) * 100)}% {t("discount")}
                                            </span>
                                        </div>
                                    )}
                                    {/* Actual price */}
                                    <div>
                                        <span className="text-4xl font-bold text-slate-900">৳{formatPrice(pkg.price)}</span>
                                        {pkg.period && <span className="text-slate-500">/{t.has(`periods.${pkg.period}`) ? t(`periods.${pkg.period}`) : pkg.period}</span>}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Features list with values */}
                        <ul className="space-y-3 mb-6 flex-grow">
                            {typeof pkg.features === 'object' && Array.isArray(pkg.features) && (pkg.features as Array<string | {name: string; value?: string}>).map((feature, idx: number) => {
                                // Handle both string features and {name, value} object features
                                const featureName = typeof feature === 'string' ? feature : feature.name;
                                const featureValue = typeof feature === 'object' && feature.value ? feature.value : null;
                                
                                return (
                                    <li key={idx} className="flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-3">
                                            <FaCheck className="text-teal-500 mt-1 flex-shrink-0" />
                                            {featureName.startsWith('**') && featureName.endsWith('**') ? (
                                                <span className="text-slate-800 font-bold">{featureName.slice(2, -2)}</span>
                                            ) : (
                                                <span className="text-slate-600">{featureName}</span>
                                            )}
                                        </div>
                                        {featureValue && (
                                            <span className="text-slate-400 text-sm whitespace-nowrap">৳{formatPrice(featureValue)}</span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                        
                        {/* Total value summary (if has total_value) */}
                        {pkg.total_value && !isCustomPrice(pkg.price) && (
                            <div className="border-t border-slate-200 pt-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">{t("totalPrice")}</span>
                                    <span className="text-slate-400 line-through">৳{formatPrice(pkg.total_value)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold mt-1">
                                    <span className="text-teal-600">{t("yourSavings")}</span>
                                    <span className="text-teal-600">৳{locale === "bn" 
                                        ? toBengaliNumber(bengaliToNumber(pkg.total_value) - bengaliToNumber(pkg.price))
                                        : (bengaliToNumber(pkg.total_value) - bengaliToNumber(pkg.price)).toLocaleString('en-IN')
                                    }</span>
                                </div>
                            </div>
                        )}

                        <Button
                            className="w-full mt-auto"
                            variant={pkg.popular ? "primary" : "secondary"}
                            onClick={() => handleAction(pkg)}
                        >
                            {isCustomPrice(pkg.price) ? t("contactUs") : t("orderNow")}
                        </Button>
                    </GlassCard>
                ))}

                {filteredPackages.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        {t("noPackages")}
                    </div>
                )}
            </div>

            {selectedPkg && (
                <OrderModal
                    isOpen={!!selectedPkg}
                    onClose={() => setSelectedPkg(null)}
                    packageName={selectedPkg.name}
                    price={formatPrice(selectedPkg.price)}
                />
            )}
        </>
    );
}
