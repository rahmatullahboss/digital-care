import { getD1Database } from "@/lib/db";
import { Service } from "@/lib/db";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceContent from "@/components/ui/ServiceContent";
import { getTranslations } from "next-intl/server";

import { unstable_cache } from "next/cache";

// Force dynamic rendering for D1 access (required for now), but data will be cached
export const dynamic = "force-dynamic";

const getServices = unstable_cache(
  async () => {
    const db = await getD1Database();
    const { results } = await db
      .prepare("SELECT * FROM services WHERE id NOT IN ('service-002', 'service-004') ORDER BY order_index ASC")
      .all();

    // Parse JSON
    return results.map((s: Record<string, unknown>) => ({
      ...s,
      features: s.features ? JSON.parse(s.features as string) : [],
      benefits: s.benefits ? JSON.parse(s.benefits as string) : [],
    })) as unknown as (Service & { features: string[], benefits: string[] })[];
  },
  ['services-page-list'],
  { revalidate: 86400, tags: ['services'] }
);

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const services = await getServices();
  const t = await getTranslations("ServicesPage");

  return (
    <>
      <section className="hero-section relative pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <SectionHeader
            kicker={t("kicker")}
            title={t("title")}
            description={t("description")}
            centered
          />
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="container mx-auto px-6 relative z-10">
          <ServiceContent services={services} selectedSlug={slug} />
        </div>
      </section>
    </>
  );
}
