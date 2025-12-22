import { getD1Database } from "@/lib/db";
import { PricingPackage } from "@/lib/db";
import { FaPhone } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import PricingGrid from "./PricingGrid";
import { getTranslations } from "next-intl/server";

async function getPricingPackages() {
  const db = await getD1Database();
  const { results } = await db
    .prepare("SELECT * FROM pricing WHERE id NOT IN ('pricing-009', 'pricing-010', 'pricing-011') ORDER BY order_index ASC")
    .all();

  return results.map((p: Record<string, unknown>) => ({
    ...p,
    features: p.features ? JSON.parse(p.features as string) : [],
  })) as PricingPackage[];
}

export default async function PricingSection() {
  const packages = await getPricingPackages();
  const t = await getTranslations("Pricing");

  // Use empty array fallback to prevent hydration issues if fetch fails
  const safePackages = packages || [];

  return (
    <section id="pricing" className="section-shell py-24">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          kicker={t("kicker")}
          title={t("title")}
          description={t("description")}
          centered
        />

        <PricingGrid packages={safePackages} />

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            {t("confused")}
          </p>
          <Button href="tel:01639590392" variant="outline" icon={<FaPhone />}>
            {t("freeConsult")}
          </Button>
        </div>
      </div>
    </section>
  );
}
