import { getD1Database } from "@/lib/db";
import { Service } from "@/lib/db";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { FaGlobe, FaFacebook, FaRobot, FaBullhorn } from "react-icons/fa6";

// Force dynamic rendering for D1 data
export const dynamic = "force-dynamic";

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

  // Parse JSON
  return results.map((s: Record<string, unknown>) => ({
    ...s,
    features: s.features ? JSON.parse(s.features as string) : [],
    benefits: s.benefits ? JSON.parse(s.benefits as string) : [],
  })) as unknown as (Service & { features: string[], benefits: string[] })[];


}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const services = await getServices();

  const selectedService = slug
    ? services.find((s) => s.slug === slug)
    : services[0];

  return (
    <>
      <section className="hero-section relative py-16 md:py-24">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <SectionHeader
            kicker="আমাদের সেবাসমূহ"
            title="আধুনিক প্রযুক্তির সমন্বয়ে সেরা সেবা"
            description="আপনার ব্যবসার প্রতিটি ধাপে আমরা আছি আপনার পাশে"
            centered
          />
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 sticky top-24">
                <h3 className="text-lg font-bold text-white px-4 mb-4">
                  সব সার্ভিস
                </h3>
                <div className="space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services?slug=${service.slug}`}
                      className={`block px-4 py-3 rounded-xl transition-all ${selectedService?.id === service.id
                        ? "bg-teal-500/20 text-teal-400 font-medium"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-8">
              {selectedService ? (
                <GlassCard className="p-8 md:p-12">
                  <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center text-3xl text-teal-400 mb-6">
                    {iconMap[selectedService.icon || ""] || <FaGlobe />}
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-4">
                    {selectedService.title}
                  </h2>
                  <p className="text-lg text-slate-300 leading-relaxed mb-8">
                    {selectedService.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">
                        ফিচারসমূহ
                      </h3>
                      <ul className="space-y-3">
                        {selectedService.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-400">
                            <FaCheck className="text-teal-500 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {selectedService.features.length === 0 && (
                          <li className="text-slate-500">কোন ফিচার যুক্ত করা হয়নি</li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">
                        কেন এটি প্রয়োজন?
                      </h3>
                      <ul className="space-y-3">
                        {selectedService.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-400">
                            <FaCheck className="text-teal-500 mt-1 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                        {selectedService.benefits.length === 0 && (
                          <li className="text-slate-500">কোন বেনিফিট যুক্ত করা হয়নি</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button href="/#contact">অর্ডার করুন</Button>
                    <Link href="/#pricing">
                      <Button variant="outline">প্রাইসিং দেখুন</Button>
                    </Link>
                  </div>
                </GlassCard>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  কোন সার্ভিস সিলেক্ট করা হয়নি
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
