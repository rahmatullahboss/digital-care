import { getD1Database } from "@/lib/db";
import { Service } from "@/lib/db";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceGrid from "@/components/ui/ServiceGrid";
import { getTranslations } from "next-intl/server";

async function getServices() {
  const db = await getD1Database();
  const { results } = await db
    .prepare("SELECT * FROM services ORDER BY order_index ASC")
    .all();
  return results as Service[];
}

export default async function ServicesSection() {
  const services = await getServices();
  const t = await getTranslations("Services");

  return (
    <section id="services" className="section-shell py-24">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          kicker={t("kicker")}
          title={t("title")}
          description={t("description")}
          centered={true}
          className="mb-16"
        />

        <ServiceGrid services={services} />
      </div>
    </section>
  );
}
