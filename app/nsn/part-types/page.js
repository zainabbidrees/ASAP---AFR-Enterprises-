import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
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

            <p className={styles.intro}>Welcome to the AFR Enterprises alphanumeric collection of NSN part types, where every major aerospace, defense, and industrial category can be browsed with ease. Simply click the &quot;View All&quot; button in any number or letter group (0-9, A-E, F-J, K-O, P-T, U-Z) to view detailed listings. Each product name serves as a direct link to relevant part numbers, CAGE codes, and NSNs. Explore our catalog at your pace, or reach out to our team via phone or email for hands-on procurement support.</p>

            <p className={styles.urgent}>Need an Urgent Quote for Specific NSN Part Types? Submit an online Request for Quote (RFQ) to receive target pricing, lead times, and availability within 15 minutes.</p>

            <h2 className={styles.blockTitle}>Industry Applications &amp; Sourcing Capabilities</h2>
            <ul className={styles.bullets}>
              <li><strong>Commercial Aviation &amp; MRO:</strong> Rapid delivery for structural hardware, airframe components, and flight systems during scheduled maintenance.</li>
              <li><strong>Defense &amp; Military Logistics:</strong> Strategic supply chain support for military aircraft, naval systems, and ground defense applications.</li>
              <li><strong>Multi-Level Mapping:</strong> Instant cross-referencing between part numbers, CAGE codes, FSCs, and active NSN listings.</li>
            </ul>

            <h2 className={styles.blockTitle}>How AFR Enterprises Provides Leading NSN Solutions</h2>
            <ul className={styles.bullets}>
              <li><strong>Quality Assurance:</strong> From document verification and physical inspections to electronic testing, we strictly assure the quality of our offered parts so you receive NSN components that meet compliance and performance standards.</li>
              <li><strong>Rapid Shipping:</strong> If you have a lines-down situation or an AOG requirement, we support you with expedited fulfillment and diverse delivery options to keep critical operations running.</li>
              <li><strong>Traceable Sourcing:</strong> All inventory is backed by complete Certificates of Conformance (CoC) and batch tracking to guarantee authenticity.</li>
            </ul>

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
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}
