"use client";

import { useState, FormEvent } from "react";
import { FaEnvelope, FaPhone, FaLocationDot, FaClock } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwYe6g5vR8bkpk-I9TZ2_ny18LK943kKjBTd0RiSuL-roumoF4U-pj2_x2fGazBxxhB/exec";

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);

    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => formData.append(key, value));

    try {
      const response = await fetch(SCRIPT_URL, { method: "POST", body: formData });
      const data = await response.json();

      if (data.result === "success") {
        setFormMessage({ type: "success", text: "আপনার বার্তা সফলভাবে পাঠানো হয়েছে। ধন্যবাদ!" });
        setFormState({ name: "", phone: "", email: "", message: "" });
      } else {
        throw new Error(data.message);
      }
    } catch {
      setFormMessage({ type: "error", text: "একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-shell section-shell-dark py-24 text-white">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          kicker="যোগাযোগ করুন"
          kickerIcon={<FaEnvelope className="text-teal-300" />}
          title="আজই কথা বলুন"
          description="আপনার ব্যবসার ডিজিটাল যাত্রা শুরু করতে বিনামূল্যে কৌশল সেশনের জন্য যোগাযোগ করুন।"
          variant="dark"
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
              <span className="w-12 h-12 rounded-full bg-teal-500/30 flex items-center justify-center">
                <FaPhone className="text-teal-300" />
              </span>
              <div>
                <p className="text-sm text-teal-200">ফোন</p>
                <a href="tel:01639590392" className="text-lg font-semibold hover:text-teal-300 transition-colors">01639590392</a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
              <span className="w-12 h-12 rounded-full bg-teal-500/30 flex items-center justify-center">
                <FaEnvelope className="text-teal-300" />
              </span>
              <div>
                <p className="text-sm text-teal-200">ইমেইল</p>
                <a href="mailto:rahmatullahzisan@gmail.com" className="text-lg font-semibold hover:text-teal-300 transition-colors">rahmatullahzisan@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
              <span className="w-12 h-12 rounded-full bg-teal-500/30 flex items-center justify-center">
                <FaLocationDot className="text-teal-300" />
              </span>
              <div>
                <p className="text-sm text-teal-200">ঠিকানা</p>
                <p className="text-lg font-semibold">ডিকেপি রোড, বরগুনা</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
              <span className="w-12 h-12 rounded-full bg-teal-500/30 flex items-center justify-center">
                <FaClock className="text-teal-300" />
              </span>
              <div>
                <p className="text-sm text-teal-200">সময়সূচী</p>
                <p className="text-lg font-semibold">২৪/৭ AI সাপোর্ট + সকাল ৯টা - রাত ৯টা</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">আপনার নাম</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  placeholder="আপনার নাম লিখুন"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">ফোন নম্বর</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  placeholder="০১XXXXXXXXX"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">ইমেইল</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">বার্তা</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
                  placeholder="আপনার ব্যবসা সম্পর্কে বলুন..."
                />
              </div>

              {formMessage && (
                <p className={`text-sm ${formMessage.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {formMessage.text}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
