import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
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
            <p className={styles.intro}>
              The manufacturers behind the National Stock Numbers we supply. Open any name for the
              part numbers, stock numbers and CAGE registration we hold against it. Every line is
              traceable to an approved source — we are AS9120B certified and AS6081 certified for
              counterfeit avoidance.
            </p>

            <ul className={styles.numGrid}>
              {sorted.map((m) => (
                <li key={m}>
                  <Link href={`/nsn/manufacturer/${slugify(m)}/`}>{m}</Link>
                </li>
              ))}
            </ul>

            <div className={styles.cta}>
              <h2 className={styles.ctaTitle}>Looking for a manufacturer not listed?</h2>
              <p className={styles.ctaBody}>
                This is a working directory, not the whole supply network. Send the part number and
                we&apos;ll tell you honestly whether we can source it — and by when.
              </p>
              <Link className="btn" href="/straightrfq/">Request a Quote</Link>
            </div>
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}
