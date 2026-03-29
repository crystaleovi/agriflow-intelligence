import { HeroSection } from "@/components/landing/HeroSection";
import { MetricsSection } from "@/components/landing/MetricsSection";
import { AnalyticsSection } from "@/components/landing/AnalyticsSection";
import { SupplyMapSection } from "@/components/landing/SupplyMapSection";
import { InsightsSection } from "@/components/landing/InsightsSection";
import { ValueSection } from "@/components/landing/ValueSection";
import { FooterSection } from "@/components/landing/FooterSection";
import { Navbar } from "@/components/landing/Navbar";
import { SimulationControlSection } from "@/components/landing/SimulationControlSection";
import { SystemArchitectureSection } from "@/components/landing/SystemArchitectureSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MetricsSection />
      <SimulationControlSection />
      <AnalyticsSection />
      <SupplyMapSection />
      <InsightsSection />
      <SystemArchitectureSection />
      <ValueSection />
      <FooterSection />
    </div>
  );
};

export default Index;
