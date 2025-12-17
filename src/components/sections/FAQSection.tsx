import { FaCircleQuestion } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQItem from "@/components/ui/FAQItem";
import { faqs } from "@/data/faq";

export default function FAQSection() {
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
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
