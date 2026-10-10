import { connection } from "next/server";
import { AboutSection } from "@/features/landing/components/about-section";
import { ContactSection } from "@/features/landing/components/contact-section";
import { FeaturesSection } from "@/features/landing/components/features-section";
import { GaragesSection } from "@/features/landing/components/garages-section";
import { HeroSection } from "@/features/landing/components/hero-section";
import { SiteFooter } from "@/features/landing/components/site-footer";
import { SiteHeader } from "@/features/landing/components/site-header";
import { StatsSection } from "@/features/landing/components/stats-section";
import { TestimonialSection } from "@/features/landing/components/testimonial-section";
import { getFeaturedGarages, getLandingStats } from "@/features/landing/queries";

// Public landing page (Oberlo template). Logged-in users are redirected to /dashboard by src/proxy.ts.
export default async function HomePage() {
  await connection(); // render on each request so the stats stay live (no DB access at build time)
  const [stats, garages] = await Promise.all([getLandingStats(), getFeaturedGarages()]);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <StatsSection stats={stats} />
        <GaragesSection garages={garages} />
        <TestimonialSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
