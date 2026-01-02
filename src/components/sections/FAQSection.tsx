import { getD1Database, FAQ } from "@/lib/db";
import { FaCircleQuestion } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQList from "@/components/ui/FAQList";
import { getTranslations } from "next-intl/server";

import { unstable_cache } from "next/cache";

const getFaqs = unstable_cache(
  async () => {
    const db = await getD1Database();
    const { results } = await db
      .prepare("SELECT * FROM faq ORDER BY order_index ASC")
      .all();
    return results as FAQ[];
  },
  ['faq-section-list'],
  { revalidate: 86400, tags: ['faq'] }
);

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

        <FAQList faqs={faqs} emptyMessage={t("empty")} />
      </div>
    </section>
  );
}
