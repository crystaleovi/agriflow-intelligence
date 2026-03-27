import { HeroSection } from "@/components/landing/HeroSection";
import { MetricsSection } from "@/components/landing/MetricsSection";
import { AnalyticsSection } from "@/components/landing/AnalyticsSection";
import { SupplyMapSection } from "@/components/landing/SupplyMapSection";
import { InsightsSection } from "@/components/landing/InsightsSection";
import { ValueSection } from "@/components/landing/ValueSection";
import { FooterSection } from "@/components/landing/FooterSection";
import { Navbar } from "@/components/landing/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MetricsSection />
      <AnalyticsSection />
      <SupplyMapSection />
      <InsightsSection />
      <ValueSection />
      <FooterSection />
    </div>
  );
};

export default Index;
