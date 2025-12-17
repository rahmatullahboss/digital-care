import { getD1Database } from "@/lib/db";
import { Service } from "@/lib/db";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
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
      <section className="hero-section relative pt-16 pb-8 md:pt-24 md:pb-12">
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
            {/* Sidebar - Dark gradient card */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-slate-700/90 via-slate-800/95 to-slate-900/90 backdrop-blur-xl border border-slate-600/30 rounded-3xl p-6 sticky top-24 shadow-2xl shadow-slate-900/50">
                <h3 className="text-xl font-bold text-white px-2 mb-6">
                  সব সার্ভিস
                </h3>
                <div className="space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services?slug=${service.slug}`}
                      className={`block px-4 py-3.5 rounded-xl transition-all duration-300 ${selectedService?.id === service.id
                        ? "bg-gradient-to-r from-teal-500/20 to-emerald-500/10 text-teal-300 font-semibold border-l-4 border-teal-400"
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200 hover:pl-5"
                        }`}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Content - Light theme card */}
            <div className="lg:col-span-8">
              {selectedService ? (
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-50 via-white to-emerald-50 rounded-2xl flex items-center justify-center text-3xl text-teal-500 mb-8 shadow-lg shadow-teal-500/20">
                    {iconMap[selectedService.icon || ""] || <FaGlobe />}
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {selectedService.title}
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-slate-600 leading-relaxed mb-10">
                    {selectedService.description}
                  </p>

                  {/* Two Column Features */}
                  <div className="grid md:grid-cols-2 gap-10 mb-12">
                    {/* Features Column */}
                    <div>
                      <h3 className="text-lg font-bold text-teal-600 mb-5 flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-teal-500 rounded-full"></span>
                        কি থাকছে
                      </h3>
                      <ul className="space-y-4">
                        {selectedService.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                              <FaCheck className="text-white text-xs" />
                            </span>
                            <span className="text-slate-700 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                        {selectedService.features.length === 0 && (
                          <li className="text-slate-400 italic">কোন ফিচার যুক্ত করা হয়নি</li>
                        )}
                      </ul>
                    </div>

                    {/* Benefits Column */}
                    <div>
                      <h3 className="text-lg font-bold text-teal-600 mb-5 flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-teal-500 rounded-full"></span>
                        কেন এটি প্রয়োজন?
                      </h3>
                      <ul className="space-y-4">
                        {selectedService.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                              <FaCheck className="text-white text-xs" />
                            </span>
                            <span className="text-slate-700 leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                        {selectedService.benefits.length === 0 && (
                          <li className="text-slate-400 italic">কোন বেনিফিট যুক্ত করা হয়নি</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button href="/#contact">অর্ডার করুন</Button>
                    <Link href="/#pricing">
                      <Button variant="outline">প্রাইসিং দেখুন</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 bg-white/80 rounded-3xl">
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
