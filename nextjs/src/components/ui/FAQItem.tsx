"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/80 to-slate-200/60 border border-slate-200/80 shadow-lg shadow-slate-200/35 overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-5 text-left font-semibold gap-4 hover:bg-white/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-slate-800">{question}</span>
        {isOpen ? (
          <FaChevronUp className="text-teal-600 flex-shrink-0" />
        ) : (
          <FaChevronDown className="text-slate-400 flex-shrink-0" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-5 pb-5 text-slate-600 leading-relaxed">{answer}</div>
      </div>
    </div>
  );
}
