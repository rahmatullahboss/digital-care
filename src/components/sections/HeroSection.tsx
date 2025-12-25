"use client";

import { useEffect, useRef, useMemo } from "react";
import { FaArrowRight, FaBolt, FaPlay } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export default function HeroSection() {
  const t = useTranslations("Hero");
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const industryWords = useMemo(() => [
    t("industries.business"),
    t("industries.resort"),
    t("industries.hospital"),
    t("industries.ecommerce"),
  ], [t]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      
      industryWords.forEach((word) => {
        tl.to(textRef.current, { duration: 1, text: word, ease: "none" })
          .to({}, { duration: 2 })
          .to(textRef.current, { duration: 0.5, text: "", ease: "none" });
      });

      // Cursor animation
      gsap.to(cursorRef.current, {
        opacity: 0,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        duration: 0.5 
      });
    });

    return () => ctx.revert();
  }, [industryWords]);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="hero-gradient absolute inset-0 opacity-50 pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-teal-700 shadow-sm backdrop-blur">
              <FaBolt className="text-teal-500" />
              {t("badge")}
            </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight max-w-4xl mx-auto">
          {t("titlePre")}{" "}
          <span className="text-teal-600 inline-block min-w-[200px] md:min-w-[280px] text-left">
             <span ref={textRef}></span>
             <span ref={cursorRef} className="ml-1 font-light">|</span>
          </span>{" "}
          <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 bg-clip-text text-transparent">
            {t("titleMid")}
          </span>{" "}
          {t("titlePost")}
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href="#contact" icon={<FaArrowRight />}>
            {t("ctaStrategy")}
          </Button>
          <Button href="#portfolio" variant="secondary" icon={<FaPlay />} className="!bg-white hover:!bg-slate-50">
            {t("ctaVideo")}
          </Button>
        </div>
      </div>
    </section>
  );
}
