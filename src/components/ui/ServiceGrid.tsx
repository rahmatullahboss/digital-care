"use client";

import { Service } from "@/lib/db";
import ServiceCard from "@/components/ui/ServiceCard";
import { FaArrowRight, FaGlobe, FaFacebook, FaRobot, FaBullhorn, FaMobile } from "react-icons/fa6";
import { useTranslateDbContent } from "@/hooks/useTranslateDbContent";

// Map icons
const iconMap: Record<string, React.ReactNode> = {
  FaGlobe: <FaGlobe />,
  FaFacebook: <FaFacebook />,
  FaRobot: <FaRobot />,
  FaBullhorn: <FaBullhorn />,
  FaMobileAlt: <FaMobile />,
  FaMobile: <FaMobile />,
};

interface ServiceGridProps {
  services: Service[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  const { translateServices } = useTranslateDbContent();
  const translatedServices = translateServices(services);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {translatedServices.map((service) => {
        // Safe parsing of features
        let features: string[] = [];
        try {
          if (Array.isArray(service.features)) {
            features = service.features;
          } else if (typeof service.features === 'string') {
            features = JSON.parse(service.features);
          }
        } catch {
          features = [];
        }

        return (
          <ServiceCard
            key={service.id}
            icon={iconMap[service.icon || ""] || <FaGlobe />}
            title={service.title}
            description={service.tagline || service.description || ""}
            features={features.slice(0, 3)}
            href={`/blog/service-overview-${service.slug}`}
            ctaIcon={<FaArrowRight />}
          />
        );
      })}
    </div>
  );
}
