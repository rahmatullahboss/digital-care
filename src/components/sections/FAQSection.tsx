import { getD1Database, FAQ } from "@/lib/db";
import { FaCircleQuestion } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQItem from "@/components/ui/FAQItem";

async function getFaqs() {
  const db = await getD1Database();
  const { results } = await db
    .prepare("SELECT * FROM faq ORDER BY order_index ASC")
    .all();
  return results as FAQ[];
}

export default async function FAQSection() {
  const faqs = await getFaqs();

  return (
    <section id="faq" className="section-shell py-24">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <SectionHeader
          kicker="সাধারণ জিজ্ঞাসা"
          kickerIcon={<FaCircleQuestion className="text-teal-500" />}
          title="সবচেয়ে বেশি করা প্রশ্নের উত্তর"
          description="প্রতিটি ধাপেই আমরা আপনার পাশে—FAQ থেকে যদি উত্তর না পান, সরাসরি আমাদের সাথে কথা বলুন।"
        />

        <div className="space-y-4 mt-12">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}

          {faqs.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              এখনো কোন প্রশ্ন যোগ করা হয়নি
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
