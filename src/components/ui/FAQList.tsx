"use client";

import { FAQ } from "@/lib/db";
import FAQItem from "@/components/ui/FAQItem";
import { useTranslateDbContent } from "@/hooks/useTranslateDbContent";

interface FAQListProps {
  faqs: FAQ[];
  emptyMessage: string;
}

export default function FAQList({ faqs, emptyMessage }: FAQListProps) {
  const { translateFaqs } = useTranslateDbContent();
  const translatedFaqs = translateFaqs(faqs);

  return (
    <div className="space-y-4 mt-12">
      {translatedFaqs.map((faq) => (
        <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
      ))}

      {faqs.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          {emptyMessage}
        </div>
      )}
    </div>
  );
}
