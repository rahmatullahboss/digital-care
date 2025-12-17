"use client";

import { useState } from "react";
import { FaCheck, FaStar, FaPhone } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { pricingPackages } from "@/data/pricing";

export default function PricingSection() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  return (
    <section id="pricing" className="section-shell py-24">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          kicker="মূল্য তালিকা"
          title="আপনার ব্যবসার জন্য সঠিক প্যাকেজ বেছে নিন"
          description="প্রতিটি প্যাকেজ আপনার ব্যবসার বৃদ্ধির জন্য ডিজাইন করা হয়েছে"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {pricingPackages.map((pkg) => (
            <GlassCard
              key={pkg.name}
              className={`p-8 relative ${pkg.popular ? "ring-2 ring-teal-500" : ""}`}
            >
              {pkg.popular && (
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

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <FaCheck className="text-teal-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={pkg.popular ? "primary" : "secondary"}
                onClick={() => setSelectedPackage(pkg.name)}
              >
                {pkg.price === "কাস্টম" ? "যোগাযোগ করুন" : "এখনই শুরু করুন"}
              </Button>
            </GlassCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            কোন প্যাকেজটি আপনার জন্য সঠিক তা নিয়ে দ্বিধায় আছেন?
          </p>
          <Button href="tel:01639590392" variant="outline" icon={<FaPhone />}>
            বিনামূল্যে পরামর্শ নিন
          </Button>
        </div>
      </div>
    </section>
  );
}
