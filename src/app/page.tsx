import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import PricingSection from "@/components/sections/PricingSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";

// ISR: Cache for 60 seconds, revalidate in background
// Note: Only works with manual deploy (./deploy.sh)
export const revalidate = 60;


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <PortfolioSection />
      <PricingSection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
