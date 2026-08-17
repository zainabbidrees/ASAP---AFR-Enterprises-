import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import QuickQuoteForm from "./QuickQuoteForm";
import { manufacturerParts, slugify, titleize } from "@/lib/catalog";
import { rfqFaq } from "@/lib/copy";
import styles from "./RfqDetail.module.css";

// RFQ part-detail — the conversion page every parts table points at (§4.7).
// Thin by design: identify the part, prove we can supply it, and put the form
// directly under it with the part number already filled in.
//
// Serves /rfq/{mfr}/{part}/ and the NSN variant /nsn/rfq/{mfr}/{nsn}/{part}/.
export default function RfqDetail({ mfr, part, nsn, breadcrumb, backHref, backLabel, extraSpec = [] }) {
  const mfrName = titleize(mfr);
  const partNo = part.toUpperCase();

  // Related lines from the same manufacturer — pulled from the same generator the
  // manufacturer page uses, so the two pages agree.
  const related = manufacturerParts(mfr, 8).filter((r) => r.part !== partNo).slice(0, 6);

  const spec = [
    { label: "Part number", value: partNo, mono: true },
    { label: "Manufacturer", value: mfrName },
    ...(extraSpec || []),
    ...(nsn ? [{ label: "NSN", value: formatNsn(nsn), mono: true }] : []),
    { label: "Availability", value: "Ready to ship — confirm on quote" },
    { label: "Condition", value: "Factory New · New Surplus · Overhauled" },
    { label: "Lead time", value: "Quoted in writing within 15 minutes" },
  ];

  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className={styles.h1}>
              {partNo} <span className={styles.h1Sub}>from {mfrName}</span>
            </h1>
            <p className={styles.lead}>
              {partNo} is available through AFR Enterprises. Send the quantity and the date you need
              it by, and a named specialist returns pricing, availability, condition and lead time in
              writing — normally inside 15 minutes. No account required, no obligation to proceed.
            </p>

            {/* Part identity */}
            <dl className={styles.spec}>
              {spec.map((s) => (
                <div className={styles.specRow} key={s.label}>
                  <dt>{s.label}</dt>
                  <dd className={s.mono ? styles.mono : undefined}>{s.value}</dd>
                </div>
              ))}
            </dl>

            {/* The form, pre-scoped to this part */}
            <h2 className={styles.blockTitle}>Request a quote for {partNo}</h2>
            <QuickQuoteForm part={partNo} manufacturer={mfrName} />

            <p className={styles.disclaimer}>
              Quotations are issued subject to stock and are not an offer of sale. Condition and
              certification are stated explicitly on every quote — we never leave either ambiguous.
            </p>

            {/* Related parts */}
            {related.length > 0 && (
              <>
                <h2 className={styles.blockTitle}>Other {mfrName} part numbers</h2>
                <ul className={styles.related}>
                  {related.map((r) => (
                    <li key={r.part}>
                      <Link href={r.href}>{r.part}</Link>
                    </li>
                  ))}
                </ul>
                <p className={styles.moreLink}>
                  <Link href={backHref}>{backLabel}</Link>
                </p>
              </>
            )}

            {/* FAQ */}
            <h2 className={styles.blockTitle}>{rfqFaq(partNo, mfrName).title}</h2>
            <dl className={styles.faq}>
              {rfqFaq(partNo, mfrName).items.map((item) => (
                <div className={styles.faqItem} key={item.q}>
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <InnerSidebar showBrowse={false} />
        </div>
      </section>
    </>
  );
}

// 4-2-3-4 grouping, the form NSNs are always printed in.
function formatNsn(flat) {
  const d = String(flat).replace(/\D/g, "");
  if (d.length !== 13) return flat;
  return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 9)}-${d.slice(9)}`;
}

export { slugify };
