import { getD1Database, FAQ } from "@/lib/db";
import { FaCircleQuestion } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQItem from "@/components/ui/FAQItem";
import { getTranslations } from "next-intl/server";

async function getFaqs() {
  const db = await getD1Database();
  const { results } = await db
    .prepare("SELECT * FROM faq ORDER BY order_index ASC")
    .all();
  return results as FAQ[];
}

export default async function FAQSection() {
  const faqs = await getFaqs();
  const t = await getTranslations("FAQ");

  return (
    <section id="faq" className="section-shell py-24">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <SectionHeader
          kicker={t("kicker")}
          kickerIcon={<FaCircleQuestion className="text-teal-500" />}
          title={t("title")}
          description={t("description")}
        />

        <div className="space-y-4 mt-12">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}

          {faqs.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              {t("empty")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
