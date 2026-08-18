import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import PageProse from "@/components/PageProse/PageProse";
import { MFR_POOL, slugify } from "@/lib/catalog";
import styles from "@/components/NsnIndexPage/NsnIndexPage.module.css";

export const metadata = {
  title: "NSN Manufacturers Directory | Approved Sources | AFR Enterprises",
  description:
    "Approved manufacturers behind the National Stock Numbers we supply. Browse by name for part numbers, NSNs and CAGE registrations. AS9120B certified, CAGE 6RE77.",
};

export default function NsnManufacturerIndex() {
  const sorted = [...MFR_POOL].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">NSN Approved Manufacturers</h1>

            <ul className={styles.numGrid}>
              {sorted.map((m) => (
                <li key={m}>
                  <Link href={`/nsn/manufacturer/${slugify(m)}/`}>{m}</Link>
                </li>
              ))}
            </ul>

            <PageProse
              eyebrow="About these approved sources"
              lead={[
                "The manufacturers behind the National Stock Numbers we supply. Open any name above for the part numbers, stock numbers and CAGE registration we hold against it.",
                "Every line is traceable to an approved source. We are AS9120B and ISO 9001:2015 certified, FAA AC 00-56B accredited and AS6081 certified for counterfeit avoidance, and we supply NSN-catalogued hardware under CAGE code 6RE77.",
              ]}
              cta={{
                title: "Looking for a manufacturer not listed?",
                body: "This is a working directory, not the whole supply network. Send the part number and we'll tell you honestly whether we can source it, and by when.",
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
