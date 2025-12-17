import { FaGlobe, FaRobot, FaChartLine, FaFacebookF, FaArrowRight, FaLayerGroup } from "react-icons/fa6";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

const services = [
  {
    href: "/services#web-development",
    icon: <FaGlobe className="text-xl" />,
    title: "স্মার্ট ওয়েবসাইট",
    description: "২৪/৭ গ্রাহক খুঁজে বের করে বিক্রয় নিশ্চিত করে",
  },
  {
    href: "/services#facebook-automation",
    icon: <FaFacebookF className="text-xl" />,
    title: "ফেসবুক ম্যানেজমেন্ট",
    description: "কনটেন্ট থেকে বিজ্ঞাপন সব দায়িত্ব আমাদের",
  },
  {
    href: "/services#ai-chatbot",
    icon: <FaRobot className="text-xl" />,
    title: "AI সেলস এজেন্ট",
    description: "তাৎক্ষণিক উত্তর ও লিড রূপান্তর",
  },
  {
    href: "/services#digital-marketing",
    icon: <FaChartLine className="text-xl" />,
    title: "ডিজিটাল মার্কেটিং",
    description: "ডেটা-ভিত্তিক বিজ্ঞাপন ও SEO কৌশল",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-shell py-20">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          kicker="আমাদের সেবা"
          kickerIcon={<FaLayerGroup className="text-teal-500" />}
          title="আপনার ব্যবসার জন্য স্বয়ংক্রিয় সমাধান"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-10">
          {services.map((service) => (
            <Link key={service.href} href={service.href} className="block group">
              <GlassCard className="p-5 h-full text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center text-teal-600 shadow-md group-hover:scale-105 transition-transform mb-4">
                  {service.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-teal-600 transition-colors mb-1">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{service.description}</p>
              </GlassCard>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button href="/services" variant="secondary" icon={<FaArrowRight />}>
            সব সার্ভিস দেখুন
          </Button>
        </div>
      </div>
    </section>
  );
}
