// ─── LandingPage.jsx ─────────────────────────────────────────────────────────
// Assembles all landing sections in correct order
// Usage: routed at "/" in App.jsx

import PageWrapper from "@/components/ui/PageWrapper";
import {
  Navbar,
  HeroSection,
  FeaturesSection,
  WorkflowSection,
  ArchitectureSection,
  DashboardPreview,
  StatsSection,
  TestimonialsSection,
  TeamSection,
  TechStackSection,
  CTASection,
  Footer,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <PageWrapper>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <ArchitectureSection />
      <DashboardPreview />
      <StatsSection />
      <TestimonialsSection />
      <TeamSection />
      <TechStackSection />
      <CTASection />
      <Footer />
    </PageWrapper>
  );
}
