import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import PageProse from "@/components/PageProse/PageProse";
import { SECTIONS as NSN_SECTIONS } from "@/data/nsn-numbers";
import { SECTIONS as NIIN_SECTIONS } from "@/data/niin-numbers";
import styles from "./NsnIndexPage.module.css";

// The "View All" target for one leading-digit group on the NSN / NIIN indexes:
// /nsn/nsn-parts/page-{N}/ and /nsn/niin-parts/page-{N}/. Every stock number in
// the group, in full, with no parts table — the leaf pages carry those.
const CONFIG = {
  nsn: {
    sections: NSN_SECTIONS,
    label: "NSN",
    long: "National Stock Number",
    index: "/nsn/nsn-parts/",
    base: "/nsn/nsn-parts/page-",
    crumb: "NSN Parts",
  },
  niin: {
    sections: NIIN_SECTIONS,
    label: "NIIN",
    long: "National Item Identification Number",
    index: "/nsn/niin-parts/",
    base: "/nsn/niin-parts/page-",
    crumb: "NIIN Parts",
  },
};

export default function NsnIndexPage({ kind, group }) {
  const cfg = CONFIG[kind];
  const section = cfg.sections.find((s) => String(s.digit) === String(group));
  const entries = section?.entries || [];

  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">
              {cfg.label} Group {group}: Complete Listing
            </h1>
            {entries.length > 0 ? (
              <ul className={styles.numGrid}>
                {entries.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.intro}>
                Nothing catalogued in group {group} yet.{" "}
                <Link href={cfg.index}>Browse the full {cfg.label} index</Link> instead.
              </p>
            )}

            <div className={styles.digitNav}>
              {cfg.sections.map((s) => (
                <Link
                  key={s.digit}
                  href={`${cfg.base}${s.digit}/`}
                  className={String(s.digit) === String(group) ? styles.digitActive : styles.digitLink}
                >
                  {s.digit}
                </Link>
              ))}
            </div>

            <PageProse
              eyebrow={`${cfg.label} group ${group}`}
              lead={[
                `Every ${cfg.long} we catalog in group ${group}. Open any number above for the part numbers, approved manufacturers${kind === "nsn" ? " and MIL-STD characteristic data" : ""} recorded against it.`,
                `AFR Enterprises supplies NSN-catalogued hardware under CAGE code 6RE77 with full traceability on every shipment. Every line is quoted in Factory New, New Surplus or Overhauled condition, stated explicitly.`,
              ]}
              cta={{
                title: "Have the stock number already?",
                body: `Skip the browse. Send the ${cfg.label} with your quantity and required date and a specialist returns pricing, availability and condition in writing, normally inside 15 minutes.`,
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
