import { FaGlobe, FaRobot, FaChartLine, FaFacebookF, FaWandMagicSparkles, FaMessage, FaCheck, FaArrowRight } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

const services = [
  {
    id: "web-development",
    icon: <FaGlobe className="text-3xl" />,
    title: "স্মার্ট ওয়েবসাইট ও সেলস ফানেল",
    tagline: "আপনার ডিজিটাল সেলস টিম ২৪/৭",
    description: "আমরা শুধু ওয়েবসাইট বানাই না; আমরা এমন স্বয়ংক্রিয় সেলস সিস্টেম তৈরি করি যা প্রতিটি ভিজিটরকে লিডে রূপান্তর করে, তাদের তথ্য সংগ্রহ করে এবং আপনার বিক্রি বাড়াতে কাজ করে—দিনরাত অবিরাম।",
    features: [
      "কনভার্সন-কেন্দ্রিক ল্যান্ডিং পেজ ও ফানেল ডিজাইন",
      "CRM ও অটোমেটেড ফলো-আপ ইন্টিগ্রেশন",
      "স্বয়ংক্রিয় লিড সংগ্রহ সিস্টেম",
      "সার্চ ইঞ্জিনের জন্য সম্পূর্ণ অপ্টিমাইজড (SEO)",
      "মোবাইল-ফার্স্ট রেসপন্সিভ ডিজাইন",
      "দ্রুত লোডিং ও পারফরম্যান্স অপ্টিমাইজেশন",
    ],
    benefits: [
      "২৪/৭ স্বয়ংক্রিয়ভাবে লিড জেনারেশন",
      "বিক্রয় চক্র ৪০% পর্যন্ত সংক্ষিপ্ত",
      "গ্রাহক অধিগ্রহণ খরচ হ্রাস",
    ],
  },
  {
    id: "facebook-automation",
    icon: <FaFacebookF className="text-3xl" />,
    title: "সম্পূর্ণ ফেসবুক পেজ ম্যানেজমেন্ট",
    tagline: "আপনার ফেসবুক সাফল্যের দায়িত্ব আমাদের",
    description: "পেজ সেটআপ থেকে কনটেন্ট তৈরি, নিয়মিত পোস্টিং, বিজ্ঞাপন পরিচালনা এবং মেসেজ অটোমেশন পর্যন্ত ফেসবুকের সকল দায়িত্ব আমাদের। আমরা আপনার পেজকে একটি জীবন্ত কমিউনিটিতে পরিণত করি যা বিক্রি বাড়াতে সাহায্য করে।",
    features: [
      "প্রফেশনাল পেজ সেটআপ ও অপ্টিমাইজেশন",
      "ব্র্যান্ডেড কনটেন্ট ক্যালেন্ডার ও ক্রিয়েটিভ ডিজাইন",
      "নিয়মিত পোস্টিং (মাসিক ২০+ পোস্ট)",
      "ইনবক্স ও কমেন্ট ম্যানেজমেন্ট",
      "টার্গেটেড বিজ্ঞাপন ক্যাম্পেইন",
      "বিস্তারিত এনালিটিক্স ও রিপোর্টিং",
    ],
    benefits: [
      "এনগেজমেন্ট ৩০০% পর্যন্ত বৃদ্ধি",
      "ব্র্যান্ড সচেতনতা ব্যাপক বৃদ্ধি",
      "সরাসরি বিক্রয় সুযোগ তৈরি",
    ],
  },
  {
    id: "ai-chatbot",
    icon: <FaRobot className="text-3xl" />,
    title: "২৪/৭ AI সেলস এজেন্ট",
    tagline: "কখনো লিড হারাবেন না",
    description: "ছুটির দিনে বা গভীর রাতেও কোনো গ্রাহককে আর অপেক্ষা করতে হয় না। আমাদের AI এজেন্ট তাৎক্ষণিক উত্তর দিয়ে তথ্য সংগ্রহ করে এবং প্রতিটি সুযোগকে বিক্রিতে রূপান্তর করার জন্য প্রস্তুত করে।",
    features: [
      "মেসেঞ্জার, ওয়েবসাইট ও হোয়াটসঅ্যাপ ইন্টিগ্রেশন",
      "বাংলা ও ইংরেজিতে স্বয়ংক্রিয় কথোপকথন",
      "তাৎক্ষণিক FAQ উত্তর ও প্রোডাক্ট তথ্য",
      "লিড কোয়ালিফিকেশন ও স্কোরিং",
      "সেলস টিমে স্বয়ংক্রিয় হস্তান্তর",
      "বিস্তারিত কথোপকথন বিশ্লেষণ",
    ],
    benefits: [
      "রেসপন্স টাইম ২ সেকেন্ডের কম",
      "৯৫% বেশি লিড ক্যাপচার",
      "কাস্টমার সার্ভিস খরচ ৬০% হ্রাস",
    ],
  },
  {
    id: "digital-marketing",
    icon: <FaChartLine className="text-3xl" />,
    title: "ডিজিটাল মার্কেটিং ও বিজ্ঞাপন",
    tagline: "ডেটা-চালিত সাফল্য",
    description: "অনুমানের ওপর ভিত্তি করে আর মার্কেটিং নয়। আমরা ডেটা বিশ্লেষণ করে এমন বিজ্ঞাপন ও SEO কৌশল তৈরি করি যা প্রতিটি টাকায় আপনার জন্য সর্বোচ্চ লাভ নিশ্চিত করে।",
    features: [
      "ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপন",
      "গুগল অ্যাডস ম্যানেজমেন্ট",
      "সার্চ ইঞ্জিন অপ্টিমাইজেশন (SEO)",
      "কনটেন্ট মার্কেটিং কৌশল",
      "রিমার্কেটিং ক্যাম্পেইন",
      "মাসিক ROI বিশ্লেষণ ও স্ট্র্যাটেজি আপডেট",
    ],
    benefits: [
      "বিজ্ঞাপন ROI ৩x-৫x বৃদ্ধি",
      "অর্গানিক ট্রাফিক ২০০% বৃদ্ধি",
      "লিড খরচ ৪০% হ্রাস",
    ],
  },
];

export const metadata = {
  title: "আমাদের সার্ভিসসমূহ - ডিজিটাল কেয়ার সলিউশনস",
  description: "হাসপাতাল ও ক্লিনিকের জন্য আমাদের প্রদানকৃত ডিজিটাল সেবাগুলো বিস্তারিত দেখুন",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section relative py-16 md:py-24">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-teal-700 shadow-sm">
              আমাদের সার্ভিসসমূহ
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900">
              আপনার ব্যবসার জন্য সম্পূর্ণ ডিজিটাল সলিউশন
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              প্রতিটি সেবা আপনার ব্যবসার বৃদ্ধির জন্য বিশেষভাবে ডিজাইন করা হয়েছে
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section-shell py-16">
        <div className="container mx-auto px-6 relative z-10">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`scroll-mt-24 grid lg:grid-cols-2 gap-10 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <GlassCard className="p-8 lg:p-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/40 mb-6">
                      {service.icon}
                    </div>
                    <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
                      {service.tagline}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mt-2 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Button href="/#contact" icon={<FaArrowRight />}>
                      এই সার্ভিস নিতে চাই
                    </Button>
                  </GlassCard>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <FaWandMagicSparkles className="text-teal-500" />
                        কী কী পাবেন
                      </h3>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <FaCheck className="text-teal-500 mt-1 flex-shrink-0" />
                            <span className="text-slate-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100">
                      <h3 className="text-sm font-semibold text-teal-800 mb-3">প্রত্যাশিত ফলাফল</h3>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-2 text-sm text-teal-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell section-shell-dark py-16">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            কোন সার্ভিসটি আপনার জন্য সঠিক?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            বিনামূল্যে কৌশল সেশনে আমাদের সাথে কথা বলুন এবং আপনার ব্যবসার জন্য সেরা সলিউশন জানুন
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/#contact" icon={<FaMessage />}>
              বিনামূল্যে পরামর্শ নিন
            </Button>
            <Button href="tel:01639590392" variant="secondary">
              এখনই কল করুন
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
