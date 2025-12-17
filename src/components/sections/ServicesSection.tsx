import { getD1Database } from "@/lib/db";
import { Service } from "@/lib/db";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { FaGlobe, FaFacebook, FaRobot, FaBullhorn } from "react-icons/fa6";

// Map icons
const iconMap: Record<string, React.ReactNode> = {
  FaGlobe: <FaGlobe />,
  FaFacebook: <FaFacebook />,
  FaRobot: <FaRobot />,
  FaBullhorn: <FaBullhorn />,
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

  return (
    <section id="services" className="section-shell">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          kicker="আমাদের সার্ভিস"
          title="আপনার ব্যবসার ডিজিটাল পার্টনার"
          description="আমরা শুধু সার্ভিস দেই না, আপনার ব্যবসার বৃদ্ধিতে সাহায্য করি"
          centered={true}
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              icon={iconMap[service.icon || ""] || <FaGlobe />}
              title={service.title}
              description={service.tagline || ""}
              href={`/services?slug=${service.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
