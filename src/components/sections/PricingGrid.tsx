"use client";

import { useState } from "react";
import { FaCheck, FaStar } from "react-icons/fa6";
import { PricingPackage } from "@/lib/db";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import OrderModal from "@/components/ui/OrderModal";

interface PricingGridProps {
    packages: PricingPackage[];
}

export default function PricingGrid({ packages }: PricingGridProps) {
    const [selectedPkg, setSelectedPkg] = useState<PricingPackage | null>(null);

    const handleAction = (pkg: PricingPackage) => {
        if (pkg.price === "কাস্টম") {
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 pt-6">
                {packages.map((pkg) => (
                    <GlassCard
                        key={pkg.id}
                        className={`p-8 relative flex flex-col ${pkg.popular ? "ring-2 ring-teal-500" : ""}`}
                    >
                        {pkg.popular === 1 && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-semibold">
                                    <FaStar /> সবচেয়ে জনপ্রিয়
                                </span>
                            </div>
                        )}

                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-slate-900">{pkg.name}</h3>
                            <p className="text-slate-500 mt-1">{pkg.description}</p>
                            <div className="mt-4">
                                <span className="text-4xl font-bold text-slate-900">৳{pkg.price}</span>
                                {pkg.period && <span className="text-slate-500">/{pkg.period}</span>}
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-grow">
                            {/* Parse features if strictly array of strings */}
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
                        // Remove href so it's a button, not a link
                        >
                            {pkg.price === "কাস্টম" ? "যোগাযোগ করুন" : "এখনই শুরু করুন"}
                        </Button>
                    </GlassCard>
                ))}

                {packages.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500">
                        কোন প্যাকেজ পাওয়া যায়নি
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
