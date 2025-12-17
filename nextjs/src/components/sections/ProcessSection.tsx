import { FaComments, FaLightbulb, FaCode, FaRocket } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "০১",
    icon: <FaComments className="text-2xl" />,
    title: "আলোচনা",
    description: "আপনার ব্যবসা, লক্ষ্য এবং চ্যালেঞ্জগুলো বুঝতে আমরা গভীর আলোচনা করি।",
  },
  {
    number: "০২",
    icon: <FaLightbulb className="text-2xl" />,
    title: "কৌশল",
    description: "আপনার জন্য কাস্টম ডিজিটাল কৌশল তৈরি করি যা ফলাফল দেয়।",
  },
  {
    number: "০৩",
    icon: <FaCode className="text-2xl" />,
    title: "বাস্তবায়ন",
    description: "আমাদের দক্ষ টিম সব সিস্টেম সেটআপ ও ইন্টিগ্রেশন করে।",
  },
  {
    number: "০৪",
    icon: <FaRocket className="text-2xl" />,
    title: "লঞ্চ ও অপটিমাইজ",
    description: "লঞ্চের পর ক্রমাগত অপটিমাইজেশন করে সেরা ফলাফল নিশ্চিত করি।",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="section-shell py-24">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          kicker="আমাদের প্রক্রিয়া"
          title="কীভাবে আমরা কাজ করি"
          description="একটি সুসংগঠিত প্রক্রিয়ার মাধ্যমে আমরা আপনার ব্যবসার ডিজিটাল রূপান্তর করি"
        />

        <div className="relative mt-16">
          {/* Process Track Line */}
          <div className="hidden lg:block process-track" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/40">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center text-xs font-bold text-teal-600">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
