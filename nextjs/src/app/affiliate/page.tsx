"use client";

import { useState, FormEvent } from "react";
import { FaHandHoldingDollar, FaBullhorn, FaHeadset, FaBlog, FaBriefcase, FaUsers, FaHandshakeAngle, FaWandMagicSparkles, FaMessage } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

const benefits = [
  {
    icon: <FaHandHoldingDollar className="text-2xl" />,
    title: "আকর্ষণীয় কমিশন",
    description: "আমরা ইন্ডাস্ট্রির সেরা কমিশন রেট অফার করি। আপনার প্রতিটি রেফারেল থেকে আয় করুন।",
  },
  {
    icon: <FaBullhorn className="text-2xl" />,
    title: "হাই-ডিমান্ড সার্ভিস",
    description: "ব্যবসার জন্য ওয়েবসাইট, ফেসবুক অটোমেশন এবং AI চ্যাটবট এখন সময়ের দাবি।",
  },
  {
    icon: <FaHeadset className="text-2xl" />,
    title: "মার্কেটিং সাপোর্ট",
    description: "আপনাকে সফল হতে সাহায্য করার জন্য ব্যানার, কনটেন্ট এবং মার্কেটিং উপকরণ সরবরাহ করব।",
  },
];

const steps = [
  { number: "১", title: "আবেদন করুন", description: "নিচের ফর্মটি পূরণ করে আমাদের প্রোগ্রামে আবেদন করুন। ৪৮ ঘণ্টার মধ্যে যোগাযোগ করব।" },
  { number: "২", title: "প্রচার করুন", description: "অনুমোদন পাওয়ার পর ইউনিক রেফারেল লিংক পাবেন। সোশ্যাল মিডিয়ায় শেয়ার করুন।" },
  { number: "৩", title: "কমিশন আয় করুন", description: "যখন কেউ আপনার লিংক দিয়ে সার্ভিস কিনবে, স্বয়ংক্রিয়ভাবে কমিশন পাবেন।" },
];

const partners = [
  { icon: <FaBlog />, title: "ব্লগার ও কনটেন্ট ক্রিয়েটর", description: "যারা ডিজিটাল মার্কেটিং নিয়ে লেখেন বা ভিডিও তৈরি করেন।" },
  { icon: <FaBriefcase />, title: "মার্কেটিং এজেন্সি ও ফ্রিল্যান্সার", description: "যারা ক্লায়েন্টদের জন্য অটোমেশন সমাধান খুঁজছেন।" },
  { icon: <FaUsers />, title: "বিজনেস কনসালটেন্ট", description: "যারা ক্লায়েন্টদের ব্যবসার উন্নতিতে সাহায্য করেন।" },
  { icon: <FaHandshakeAngle />, title: "আমাদের সন্তুষ্ট গ্রাহক", description: "যারা আমাদের সার্ভিসে উপকৃত হয়ে অন্যদের সুপারিশ করতে চান।" },
];

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwYe6g5vR8bkpk-I9TZ2_ny18LK943kKjBTd0RiSuL-roumoF4U-pj2_x2fGazBxxhB/exec";

export default function AffiliatePage() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", promotion_strategy: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);

    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => formData.append(key, value));
    formData.append("form_type", "affiliate");

    try {
      const response = await fetch(SCRIPT_URL, { method: "POST", body: formData });
      const data = await response.json();
      if (data.result === "success") {
        setFormMessage({ type: "success", text: "আপনার আবেদন সফলভাবে জমা হয়েছে। শীঘ্রই যোগাযোগ করব!" });
        setFormState({ name: "", email: "", phone: "", promotion_strategy: "" });
      } else { throw new Error(data.message); }
    } catch {
      setFormMessage({ type: "error", text: "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।" });
    } finally { setIsSubmitting(false); }
  };

  return (
    <>
      {/* Hero */}
      <section className="hero-section relative py-16 md:py-24">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-teal-700 shadow-sm">
              আমাদের সফলতার অংশীদার হোন
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900">
              অ্যাফিলিয়েট প্রোগ্রাম
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto md:mx-0">
              ডিজিটাল কেয়ার সলিউশনস এর অ্যাফিলিয়েট প্রোগ্রামে যোগ দিন। প্রতিটি সফল বিক্রিতে আকর্ষণীয় কমিশন আয় করুন।
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
              <Button href="#affiliate-form" icon={<FaWandMagicSparkles />}>এখনই আবেদন করুন</Button>
              <Button href="/services" variant="secondary" icon={<FaMessage />}>সার্ভিসসমূহ দেখুন</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-shell py-16">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader title="কেন আমাদের অ্যাফিলিয়েট প্রোগ্রামে যোগ দেবেন?" description="আমরা পার্টনারদের সফলতা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ" />
          <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
            {benefits.map((b) => (
              <GlassCard key={b.title} className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-teal-500/40 mb-6">{b.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{b.title}</h3>
                <p className="text-slate-600 leading-relaxed">{b.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-shell py-16">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader title="এটি কীভাবে কাজ করে?" description="মাত্র ৩টি সহজ ধাপে আয় শুরু করুন" />
          <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
            {steps.map((s) => (
              <GlassCard key={s.number} className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-teal-500/40 mb-6">{s.number}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="section-shell py-16">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <SectionHeader title="আমাদের পার্টনার হওয়ার জন্য কারা উপযুক্ত?" />
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {partners.map((p) => (
              <GlassCard key={p.title} className="p-6 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/40">{p.icon}</div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{p.title}</h3>
                  <p className="text-slate-600">{p.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="affiliate-form" className="section-shell py-16">
        <div className="container mx-auto px-6 relative z-10 max-w-2xl">
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-slate-900">অ্যাফিলিয়েট হতে আবেদন করুন</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">আপনার নাম</label>
                <input type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="আপনার সম্পূর্ণ নাম" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ইমেইল</label>
                <input type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="আপনার ইমেইল" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ফোন নম্বর</label>
                <input type="tel" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none" placeholder="০১XXXXXXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">প্রচার কৌশল</label>
                <textarea value={formState.promotion_strategy} onChange={(e) => setFormState({ ...formState, promotion_strategy: e.target.value })} rows={4} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none" placeholder="আপনি কীভাবে প্রচার করবেন? (ব্লগ, ইউটিউব, ফেসবুক গ্রুপ)" />
              </div>
              {formMessage && <p className={`text-sm ${formMessage.type === "success" ? "text-green-600" : "text-red-600"}`}>{formMessage.text}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "জমা হচ্ছে..." : "আবেদন জমা দিন"}</Button>
            </form>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
