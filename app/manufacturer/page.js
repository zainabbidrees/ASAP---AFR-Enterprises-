import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import PageProse from "@/components/PageProse/PageProse";
import styles from "./page.module.css";
import { SECTIONS } from "@/data/manufacturers";

export const metadata = {
  title: "Aviation & Electronic Parts Manufacturers | Complete List | AFR Enterprises",
  description:
    "Browse AFR Enterprises' A-Z directory of 5,100+ aviation, electronic, and IT hardware parts manufacturers. Find your manufacturer and submit an instant RFQ.",
};

// Letter-range quick-jump controls (scroll to section anchors below).
const RANGES = [
  { label: "0 - 9", target: "#ltr-0-9" },
  { label: "A - E", target: "#ltr-a" },
  { label: "F - J", target: "#ltr-f" },
  { label: "K - O", target: "#ltr-k" },
  { label: "P - T", target: "#ltr-p" },
  { label: "U - Z", target: "#ltr-u" },
];

// Each section = one letter group; `mfrs` is the on-page preview (full list via "View All").

export default function ManufacturersPage() {
  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          {/* MAIN COLUMN */}
          <div className={styles.main}>
            <h1 className="section-title section-title--left">
              Aviation and Electronic <strong>Parts Manufacturers Online List</strong>
            </h1>

            {/* Letter-range quick jump + name search */}
            <div className={styles.controls}>
              <ul className={styles.ranges}>
                {RANGES.map((r) => (
                  <li key={r.label}><a href={r.target}>{r.label}</a></li>
                ))}
                <li><Link className={styles.viewAllTop} href="/manufacturer/page-0/">View All</Link></li>
              </ul>
              <form className={styles.nameSearch} action="/manufacturer/" method="get" role="search">
                <input type="text" name="q" placeholder="Search by Manufacturer Name" aria-label="Search by Manufacturer Name" />
                <button type="submit" aria-label="Search"><span className="ico" aria-hidden="true" />🔍</button>
              </form>
            </div>

            {/* Letter sections */}
            <div className={styles.sections}>
              {SECTIONS.map((sec) => (
                <section className={styles.letterSection} id={sec.id} key={sec.letter}>
                  <div className={styles.letterHead}>
                    <span className={styles.letter}>{sec.letter}</span>
                    <Link className={styles.viewAll} href={sec.viewAll}>View All &#8594;</Link>
                  </div>
                  <ul className={styles.mfrGrid}>
                    {sec.mfrs.map(([name, href]) => (
                      <li key={href}><Link href={href}>{name}</Link></li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {/* Directory first, the copy about it second. */}
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

          {/* SIDEBAR */}
          <InnerSidebar />
        </div>
      </section>
    </>
  );
}
