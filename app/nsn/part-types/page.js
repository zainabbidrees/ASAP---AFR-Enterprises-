import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import PageProse from "@/components/PageProse/PageProse";
import styles from "./page.module.css";
import { SECTIONS } from "@/data/nsn-part-types";

export const metadata = {
  title: "NSN Part Types Directory & Hardware Suppliers | AFR Enterprises",
  description:
    "Browse AFR Enterprises' alphanumeric directory of NSN part types across aerospace, defense, and industrial categories. Submit an RFQ for a 15-minute quote.",
};

const RANGES = [
  { label: "0 - 9", target: "#pt-0-9" },
  { label: "A - E", target: "#pt-a" },
  { label: "F - J", target: "#pt-f" },
  { label: "K - O", target: "#pt-k" },
  { label: "P - T", target: "#pt-p" },
  { label: "U - Z", target: "#pt-u" },
];

export default function NsnPartTypesPage() {
  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">Browse a List of NSN Part Types We Stock</h1>

            {/* Letter quick jump */}
            <ul className={styles.ranges}>
              {RANGES.map((r) => (<li key={r.label}><a href={r.target}>{r.label}</a></li>))}
              <li><Link className={styles.viewAllTop} href="/nsn/part-types/page-0/">View All</Link></li>
            </ul>

            {/* Letter sections */}
            <div className={styles.sections}>
              {SECTIONS.map((sec) => (
                <section className={styles.letterSection} id={sec.id} key={sec.letter}>
                  <div className={styles.letterHead}>
                    <span className={styles.letter}>{sec.letter}</span>
                    <Link className={styles.viewAll} href={sec.viewAll}>View All &#8594;</Link>
                  </div>
                  <ul className={styles.catGrid}>
                    {sec.items.map(([name, href]) => (<li key={href}><Link href={href}>{name}</Link></li>))}
                  </ul>
                </section>
              ))}
            </div>

            {/* Directory above, the copy about it below. */}
            <PageProse
              eyebrow="About the NSN part-type directory"
              lead={[
                "This is the AFR Enterprises alphanumeric collection of NSN part types, covering every major aerospace, defense, and industrial category. Click “View All” in any number or letter group (0-9, A-E, F-J, K-O, P-T, U-Z) for the detailed listings, or open a product name directly for its part numbers, CAGE codes, and NSNs.",
                "Explore the catalog at your pace, or reach out to our team by phone or email for hands-on procurement support.",
              ]}
              blocks={[
                {
                  title: "Industry applications and sourcing capabilities",
                  items: [
                    "Commercial Aviation and MRO: Rapid delivery for structural hardware, airframe components, and flight systems during scheduled maintenance.",
                    "Defense and Military Logistics: Strategic supply-chain support for military aircraft, naval systems, and ground defense applications.",
                    "Multi-Level Mapping: Instant cross-referencing between part numbers, CAGE codes, FSCs, and active NSN listings.",
                  ],
                },
                {
                  title: "How AFR Enterprises provides leading NSN solutions",
                  items: [
                    "Quality Assurance: From document verification and physical inspection to electronic testing, we assure the quality of every part so you receive NSN components that meet compliance and performance standards.",
                    "Rapid Shipping: In a lines-down situation or an AOG requirement, we support you with expedited fulfillment and multiple delivery options to keep critical operations running.",
                    "Traceable Sourcing: All inventory is backed by complete Certificates of Conformance and batch tracking to guarantee authenticity.",
                  ],
                },
              ]}
              cta={{
                title: "Need an urgent quote for specific NSN part types?",
                body: "Submit an online Request for Quote to receive target pricing, lead times, and availability within 15 minutes.",
                href: "/straightrfq/",
                label: "Request a Quote",
              }}
            />
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}
