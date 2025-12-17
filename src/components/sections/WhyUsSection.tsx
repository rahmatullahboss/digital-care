import { FaRocket, FaClock, FaChartLine, FaHeadset, FaShieldHalved, FaUsers } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";

const reasons = [
  {
    icon: <FaRocket className="text-2xl" />,
    title: "দ্রুত ফলাফল",
    description: "প্রথম ৩০ দিনেই দৃশ্যমান পরিবর্তন। আমাদের প্রমাণিত কৌশল দ্রুত কাজ করে।",
  },
  {
    icon: <FaClock className="text-2xl" />,
    title: "২৪/৭ অটোমেশন",
    description: "আপনার ব্যবসা কখনো ঘুমায় না। AI এজেন্ট সবসময় আপনার গ্রাহকদের সেবায়।",
  },
  {
    icon: <FaChartLine className="text-2xl" />,
    title: "ডেটা-ভিত্তিক সিদ্ধান্ত",
    description: "অনুমানের বদলে ডেটা দিয়ে সিদ্ধান্ত নিন। প্রতিটি পদক্ষেপ পরিমাপযোগ্য।",
  },
  {
    icon: <FaHeadset className="text-2xl" />,
    title: "ডেডিকেটেড সাপোর্ট",
    description: "আমাদের টিম সবসময় আপনার পাশে। যেকোনো সমস্যায় তাৎক্ষণিক সাহায্য।",
  },
  {
    icon: <FaShieldHalved className="text-2xl" />,
    title: "নিরাপদ ও বিশ্বাসযোগ্য",
    description: "আপনার ডেটা সুরক্ষিত। আমরা সর্বোচ্চ নিরাপত্তা মান অনুসরণ করি।",
  },
  {
    icon: <FaUsers className="text-2xl" />,
    title: "প্রমাণিত ট্র্যাক রেকর্ড",
    description: "৫০+ সফল প্রজেক্ট। আমাদের ক্লায়েন্টদের সাফল্যই আমাদের পরিচয়।",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="section-shell section-shell-dark py-24">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          kicker="কেন আমাদের বেছে নেবেন"
          title="কেন ডিজিটাল কেয়ার আপনার জন্য সেরা পছন্দ"
          description="আমরা শুধু সার্ভিস দিই না; আমরা আপনার ব্যবসার অংশীদার হয়ে কাজ করি"
          variant="dark"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {reasons.map((reason) => (
            <GlassCard key={reason.title} variant="dark" className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-300 mb-6">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{reason.title}</h3>
              <p className="text-slate-300 leading-relaxed">{reason.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
