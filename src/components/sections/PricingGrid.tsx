"use client";

import { useState, useMemo } from "react";
import { FaCheck, FaStar, FaGlobe, FaCode, FaMobileAlt, FaDesktop, FaBullhorn } from "react-icons/fa";
import { PricingPackage } from "@/lib/db";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import OrderModal from "@/components/ui/OrderModal";

interface PricingGridProps {
    packages: PricingPackage[];
}

type Category = "all" | "website" | "webapp" | "mobile" | "software" | "marketing";

const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "সব দেখুন", icon: null },
    { id: "website", label: "ওয়েবসাইট", icon: <FaGlobe /> },
    { id: "webapp", label: "ওয়েব অ্যাপ", icon: <FaCode /> },
    { id: "mobile", label: "মোবাইল অ্যাপ", icon: <FaMobileAlt /> },
    { id: "software", label: "সফটওয়্যার", icon: <FaDesktop /> },
    { id: "marketing", label: "মার্কেটিং", icon: <FaBullhorn /> },
];

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

export default function PricingGrid({ packages }: PricingGridProps) {
    const [selectedPkg, setSelectedPkg] = useState<PricingPackage | null>(null);
    const [activeCategory, setActiveCategory] = useState<Category>("all");

    const filteredPackages = useMemo(() => {
        if (activeCategory === "all") return packages;
        return packages.filter((pkg) => getPackageCategory(pkg.name) === activeCategory);
    }, [packages, activeCategory]);

    const handleAction = (pkg: PricingPackage) => {
        if (isCustomPrice(pkg.price)) {
            // Navigate to contact section for custom packages
            const contactSection = document.getElementById("contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
            } else {
                window.location.href = "/#contact";
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
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-semibold">
                                    <FaStar /> জনপ্রিয়
                                </span>
                            </div>
                        )}

                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-slate-900">{pkg.name}</h3>
                            <p className="text-slate-500 mt-1">{pkg.description}</p>
                            <div className="mt-4">
                                {isCustomPrice(pkg.price) ? (
                                    <span className="text-2xl font-bold text-teal-600">{pkg.price}</span>
                                ) : (
                                    <>
                                        <span className="text-4xl font-bold text-slate-900">৳{pkg.price}</span>
                                        {pkg.period && <span className="text-slate-500">/{pkg.period}</span>}
                                    </>
                                )}
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-grow">
                            {typeof pkg.features === 'object' && Array.isArray(pkg.features) && (pkg.features as string[]).map((feature: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <FaCheck className="text-teal-500 mt-1 flex-shrink-0" />
                                    <span className="text-slate-600">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            className="w-full mt-auto"
                            variant={pkg.popular ? "primary" : "secondary"}
                            onClick={() => handleAction(pkg)}
                        >
                            {isCustomPrice(pkg.price) ? "যোগাযোগ করুন" : "অর্ডার করুন"}
                        </Button>
                    </GlassCard>
                ))}

                {filteredPackages.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        এই ক্যাটাগরিতে কোন প্যাকেজ পাওয়া যায়নি
                    </div>
                )}
            </div>

            {selectedPkg && (
                <OrderModal
                    isOpen={!!selectedPkg}
                    onClose={() => setSelectedPkg(null)}
                    packageName={selectedPkg.name}
                    price={selectedPkg.price}
                />
            )}
        </>
    );
}
