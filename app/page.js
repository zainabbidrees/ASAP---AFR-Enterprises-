import Hero from "@/components/home/Hero";
import ApprovedVendors from "@/components/home/ApprovedVendors";
import OurStory from "@/components/home/OurStory";
import HowItWorks from "@/components/home/HowItWorks";
import PartsUniverse from "@/components/home/PartsUniverse";
import StatsStrip from "@/components/home/StatsStrip";
import IndustriesServed from "@/components/home/IndustriesServed";
import AogBlock from "@/components/home/AogBlock";
import TopParts from "@/components/home/TopParts";
import CertStrip from "@/components/home/CertStrip";
import Testimonials from "@/components/home/Testimonials";
import FinalCta from "@/components/FinalCta/FinalCta";

// Homepage — editorial monochrome design language extracted from nor.ma,
// carrying AFR's real content. Narrative flow: hero → statement → top parts →
// trust logos → how it works → catalog → proof/stats → industries → emergency →
// certs → reviews → close. Top-requested parts sits directly after the story so
// real part numbers are the first concrete thing after the pitch.
// Light throughout, with dark accent moments at Stats, AOG, and the final CTA.
export default function HomePage() {
  return (
    <>
      <Hero />
      <OurStory />
      <TopParts />
      <ApprovedVendors />
      <HowItWorks />
      <PartsUniverse />
      <StatsStrip />
      <IndustriesServed />
      <AogBlock />
      <CertStrip />
      <Testimonials />
      <FinalCta />
    </>
  );
}
