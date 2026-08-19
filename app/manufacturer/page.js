import Link from "next/link";
import PageProse from "@/components/PageProse/PageProse";
import CatalogExplorer from "@/components/CatalogExplorer/CatalogExplorer";
import styles from "./page.module.css";
import { SECTIONS } from "@/data/manufacturers";

export const metadata = {
  title: "Aviation & Electronic Parts Manufacturers | Complete List | AFR Enterprises",
  description:
    "Browse AFR Enterprises' A-Z directory of 5,100+ aviation, electronic, and IT hardware parts manufacturers. Find your manufacturer and submit an instant RFQ.",
};

// The directory data keys each letter group as `mfrs`; the explorer expects `items`.
const EXPLORER_SECTIONS = SECTIONS.map((s) => ({
  letter: s.letter,
  id: s.id,
  viewAll: s.viewAll,
  items: s.mfrs,
}));

export default function ManufacturersPage() {
  return (
    <section className="section">
      <div className="container">
        <header className={styles.head}>
          <p className={styles.eyebrow}>Manufacturers</p>
          <h1 className={styles.title}>Aviation and Electronic Parts Manufacturers</h1>
          <p className={styles.meta}>Browse the directory A–Z, or filter by manufacturer name.</p>
        </header>

        <CatalogExplorer
          sections={EXPLORER_SECTIONS}
          noun="manufacturers"
          nounSingular="manufacturer"
          filterExample="Honeywell"
        />

        <PageProse
          eyebrow="About our manufacturer network"
          lead={[
            "At AFR Enterprises, we've built strong partnerships with a wide range of electronic parts manufacturers, giving you access to a diverse selection of in-demand aviation and electronic components on a single, streamlined purchasing platform. Our network includes globally recognized names such as Edal Industries Inc, Plessey Semiconductors, and Kollsman Instrument Corp, so you can source trusted parts without switching between suppliers.",
            "We maintain a global supply-chain network that supports fast lead times and rapid shipping, helping you meet tight operational deadlines and project timelines. We only work with dependable, vetted manufacturers, so every part you receive meets our quality standards whether you need new, used, obsolete, or hard-to-find components.",
            <>
              Every part we ship, across all{" "}
              <Link href="/part-types/">part types</Link>, goes through quality-assurance
              checks and document verification before it leaves us, so you can order with
              confidence. We also use our purchasing power and market expertise to offer
              competitive pricing without asking you to compromise on quality.
            </>,
          ]}
          blocks={[
            {
              title: "What working with us gets you",
              items: [
                "Accreditation you can audit: Owned and operated by ASAP Semiconductor, we operate under AS9120B, ISO 9001:2015, and FAA AC 00-56B accreditation.",
                "One named specialist: Personalized, one-on-one support through every stage of the buying process, from first quote to delivered shipment.",
                "Sourcing built per request: Tailored solutions and customized services for each requirement, including obsolete and long-lead lines.",
                "A quote inside 15 minutes: Submit an Instant RFQ and expect a response within 15 minutes of us reviewing your completed form.",
              ],
            },
          ]}
        />
      </div>
    </section>
  );
}
