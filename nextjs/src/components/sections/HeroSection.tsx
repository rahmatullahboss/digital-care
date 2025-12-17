"use client";

import { useEffect, useState } from "react";
import { FaShapes, FaPlay, FaWandMagicSparkles, FaRobot, FaChartLine, FaMessage, FaBolt, FaSignal } from "react-icons/fa6";
import Button from "@/components/ui/Button";

const industryWords = ["ব্যবসার", "রিসোর্টের", "হাসপাতালের", "ই-কমার্সের"];

export default function HeroSection() {
  const [industryIndex, setIndustryIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setIndustryIndex((prev) => (prev + 1) % industryWords.length);
        setIsFlipping(false);
      }, 600);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section relative py-24 md:py-32">
      {/* Background elements */}
      <div className="hero-gradient" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: Copy */}
          <div className="max-w-xl mx-auto space-y-6 text-center lg:mx-0 lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-teal-700 shadow-sm shadow-teal-200/60 backdrop-blur">
              <FaShapes className="text-teal-500" />
              ডিজিটাল সলিউশনস এজেন্সি
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900">
              আপনার{" "}
              <span
                className={`industry-text inline-block rounded-full bg-white/70 px-3 py-1 text-teal-600 shadow-inner shadow-white/60 ${
                  isFlipping ? "flip" : ""
                }`}
              >
                {industryWords[industryIndex]}
              </span>{" "}
              <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 bg-clip-text text-transparent">
                ডিজিটাল রূপান্তর
              </span>{" "}
              এখানেই শুরু
            </h1>

            <p className="text-slate-600 text-base max-w-2xl mx-auto lg:mx-0">
              এজেন্সি-গ্রেড ডিজাইন, স্বয়ংক্রিয় গ্রাহক সংযোগ এবং ডেটা-ভিত্তিক মার্কেটিং — সবকিছু এক জায়গায়। 
              আমাদের সাথে যুক্ত হন এবং প্রতিটি ডিজিটাল স্পর্শবিন্দুকে একটি বিক্রয় যাত্রায় পরিণত করুন।
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button href="#contact" icon={<FaWandMagicSparkles />}>
                বিনামূল্যে কৌশল সেশন
              </Button>
              <Button href="#case-study" variant="secondary" icon={<FaPlay />}>
                সফলতার ভিডিও দেখুন
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-8 text-left sm:grid-cols-3">
              <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-teal-100/40 backdrop-blur">
                <p className="text-2xl font-bold text-slate-900">৯৫%</p>
                <p className="text-xs text-slate-500">অটোমেশন দিয়ে লিড সাড়া বৃদ্ধি</p>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-teal-100/40 backdrop-blur">
                <p className="text-2xl font-bold text-slate-900">৫০+</p>
                <p className="text-xs text-slate-500">এজেন্সি স্টাইল ডিজিটাল ক্যাম্পেইন</p>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-teal-100/40 backdrop-blur col-span-2 sm:col-span-1">
                <p className="text-2xl font-bold text-slate-900">২৪/৭</p>
                <p className="text-xs text-slate-500">AI এজেন্ট প্রস্তুত আপনার গ্রাহকের জন্য</p>
              </div>
            </div>
          </div>

          {/* Right: Dashboard Visual */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="hero-device">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300">
                  <span className="block h-3 w-3 rounded-full bg-teal-400/80" />
                  <span className="block h-3 w-3 rounded-full bg-emerald-400/80" />
                  <span className="block h-3 w-3 rounded-full bg-sky-400/80" />
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-600">
                  লাইভ ড্যাশবোর্ড
                </span>
              </div>

              <div className="relative space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/90 p-4 shadow-inner shadow-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">সক্রিয় প্রচারণা</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">১২</p>
                    <div className="mt-4 h-2.5 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-500/80 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-teal-500 via-emerald-500 to-sky-500 p-[1px] shadow-lg shadow-teal-500/40">
                    <div className="rounded-[18px] bg-white/95 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">রূপান্তর</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">৪.৮x</p>
                      <p className="text-xs text-slate-500">গত ৩০ দিনে</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white/90 p-5 shadow-lg shadow-slate-200/50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">রিয়েল-টাইম লিড ফ্লো</p>
                  <svg viewBox="0 0 420 160" className="mt-4 w-full h-32" aria-label="রূপান্তরের প্রবৃদ্ধির রেখাচিত্র">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(14, 165, 233, 0.45)" />
                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0.05)" />
                      </linearGradient>
                    </defs>
                    <path d="M0 120 C60 80 90 130 150 100 C210 70 230 20 300 60 C360 100 390 90 420 40 L420 160 L0 160 Z" fill="url(#chartGradient)" />
                    <path d="M0 120 C60 80 90 130 150 100 C210 70 230 20 300 60 C360 100 390 90 420 40" fill="none" stroke="rgba(13,148,136,0.8)" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-500">
                    <div>
                      <span className="block text-base font-semibold text-slate-900">২.১কে</span>
                      মোট ভিজিট
                    </div>
                    <div>
                      <span className="block text-base font-semibold text-slate-900">৭৬%</span>
                      লিড কোয়ালিফাইড
                    </div>
                    <div>
                      <span className="block text-base font-semibold text-slate-900">২.৪মিনিট</span>
                      গড় সাড়া
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="floating-card floating-card-1">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <FaRobot />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">AI Assistant</p>
                  <p className="text-sm font-semibold text-slate-700">স্বয়ংক্রিয় ফলো-আপ</p>
                </div>
              </div>
            </div>

            <div className="floating-card floating-card-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <FaChartLine />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">Growth Pulse</p>
                  <p className="text-sm font-semibold text-slate-700">ROI ট্র্যাকিং</p>
                </div>
              </div>
            </div>

            <div className="floating-card floating-card-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <FaMessage />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400">Smart Inbox</p>
                  <p className="text-sm font-semibold text-slate-700">মাল্টিচ্যানেল সাড়া</p>
                </div>
              </div>
            </div>

            {/* Floating icons */}
            <div className="absolute top-[10%] right-[16%] w-14 h-14 rounded-full flex items-center justify-center text-teal-600 bg-gradient-to-br from-white/95 to-slate-200/75 shadow-lg animate-bounce">
              <FaBolt />
            </div>
            <div className="absolute bottom-[4%] left-[12%] w-14 h-14 rounded-full flex items-center justify-center text-sky-600 bg-gradient-to-br from-white/95 to-slate-200/75 shadow-lg animate-pulse">
              <FaSignal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
