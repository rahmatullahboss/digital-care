import { getD1Database } from "@/lib/db";
import { Service } from "@/lib/db";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { FaGlobe, FaFacebook, FaRobot, FaBullhorn, FaMobile, FaArrowRight } from "react-icons/fa6";
import { getTranslations } from "next-intl/server";

// Map icons
const iconMap: Record<string, React.ReactNode> = {
  FaGlobe: <FaGlobe />,
  FaFacebook: <FaFacebook />,
  FaRobot: <FaRobot />,
  FaBullhorn: <FaBullhorn />,
  FaMobileAlt: <FaMobile />,
  FaMobile: <FaMobile />,
};

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

        {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop for better 5-item layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={iconMap[service.icon || ""] || <FaGlobe />}
              title={service.title}
              description={service.tagline || service.description || ""}
              href={`/services?slug=${service.slug}`}
              ctaIcon={<FaArrowRight />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
