import Image from "next/image";
import { FaWandMagicSparkles, FaMessage } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { getTranslations, getLocale } from "next-intl/server";

const team = [
  {
    name: "রহমতুল্লাহ জিসান",
    nameEn: "Rahmatullah Zisan",
    role: "প্রতিষ্ঠাতা ও বিজনেস অটোমেশন স্ট্র্যাটেজিস্ট",
    roleEn: "Founder & Business Automation Strategist",
    image: "/rahmatullah.webp",
    bio: "আমি রহমতুল্লাহ জিসান, ছোট এবং মাঝারি ব্যবসাগুলোকে AI এবং অটোমেশনের মাধ্যমে তাদের বড় প্রতিযোগীদের সাথে পাল্লা দেওয়ার জন্য সিস্টেম তৈরি করি।",
    bioEn: "I'm Rahmatullah Zisan, building systems to help small and medium businesses compete with larger competitors through AI and automation.",
  },
  {
    name: "শারমিন আক্তার",
    nameEn: "Sharmin Akter",
    role: "মার্কেটিং বিশেষজ্ঞ",
    roleEn: "Marketing Specialist",
    image: "https://via.placeholder.com/300",
    bio: "ডিজিটাল মার্কেটিংয়ের ক্ষেত্রে ৫ বছরের অভিজ্ঞতা নিয়ে তিনি আমাদের ক্লায়েন্টদের অনলাইন উপস্থিতি বৃদ্ধি করেন।",
    bioEn: "With 5 years of experience in digital marketing, she helps grow our clients' online presence.",
  },
  {
    name: "সাজিদ হাসান",
    nameEn: "Sajid Hasan",
    role: "টেকনিক্যাল লিড",
    roleEn: "Technical Lead",
    image: "https://via.placeholder.com/300",
    bio: "ওয়েব ডেভেলপমেন্ট ও অটোমেশনে দক্ষ সাজিদ আমাদের প্রযুক্তিগত কাজগুলো তদারকি করেন।",
    bioEn: "Sajid, skilled in web development and automation, oversees our technical projects.",
  },
];

export default async function AboutPage() {
  const t = await getTranslations("About");
  const currentLocale = await getLocale();
  const isEn = currentLocale === "en";

  return (
    <>
      {/* Hero */}
      <section className="hero-section relative py-20 md:py-32">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-teal-700 shadow-sm">
              {t("badge")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-slate-900">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto md:mx-0">
              {t("description")}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
              <Button href="/services" icon={<FaWandMagicSparkles />}>
                {t("servicesBtn")}
              </Button>
              <Button href="/#contact" variant="secondary" icon={<FaMessage />}>
                {t("contactBtn")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-shell py-24">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader
            title={t("teamTitle")}
            description={t("teamDescription")}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {team.map((member) => (
              <GlassCard key={member.name} className="p-10 text-center">
                <Image
                  src={member.image}
                  alt={isEn ? member.nameEn : member.name}
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded-3xl mx-auto mb-6 ring-4 ring-white/70 shadow-xl shadow-teal-500/20"
                />
                <h3 className="text-xl font-bold text-slate-900">{isEn ? member.nameEn : member.name}</h3>
                <p className="text-teal-600">{isEn ? member.roleEn : member.role}</p>
                <p className="mt-4 text-slate-600 leading-relaxed">{isEn ? member.bioEn : member.bio}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
