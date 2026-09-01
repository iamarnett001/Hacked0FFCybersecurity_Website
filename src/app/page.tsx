import { Audience } from "@/components/audience";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { Outcomes } from "@/components/outcomes";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhyItMatters } from "@/components/why-it-matters";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Hero />
        <WhyItMatters />
        <Audience />
        <Services />
        <Outcomes />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
