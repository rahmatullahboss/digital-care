import { getD1Database } from "@/lib/db";
import { PricingPackage } from "@/lib/db";
import { FaPhone } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import PricingGrid from "./PricingGrid";

async function getPricingPackages() {
  const db = await getD1Database();
  const { results } = await db
    .prepare("SELECT * FROM pricing ORDER BY order_index ASC")
    .all();

  return results.map((p: Record<string, unknown>) => ({
    ...p,
    features: p.features ? JSON.parse(p.features as string) : [],
  })) as PricingPackage[];
}

export default async function PricingSection() {
  const packages = await getPricingPackages();

  // Use empty array fallback to prevent hydration issues if fetch fails
  const safePackages = packages || [];

  return (
    <section id="pricing" className="section-shell py-24">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          kicker="মূল্য তালিকা"
          title="আপনার ব্যবসার জন্য সঠিক প্যাকেজ বেছে নিন"
          description="প্রতিটি প্যাকেজ আপনার ব্যবসার বৃদ্ধির জন্য ডিজাইন করা হয়েছে"
          centered
        />

        <PricingGrid packages={safePackages} />

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
