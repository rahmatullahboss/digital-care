import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import PricingSection from "@/components/sections/PricingSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";

// Force dynamic rendering since we use D1 database
export const dynamic = "force-dynamic";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <PricingSection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
