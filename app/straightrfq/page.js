import Link from "next/link";
import RfqForm from "./RfqForm";
import CertBadges from "@/components/Certs/CertBadges";
import styles from "./page.module.css";

export const metadata = {
  title: "Request a Quote | 15-Minute RFQ on Aerospace & Industrial Parts | AFR Enterprises",
  description:
    "Send the part numbers and get pricing, availability, condition and lead time in writing within 15 minutes, from a named specialist. No account, no sales call. AOG requests routed to a 24/7 desk. AFR Enterprises, Anaheim, California.",
};

// The three beats after submit — a numbered rail, not a card row.
const STEPS = [
  { n: "01", name: "Send your request", line: "Part numbers, quantities and condition. One line or a full bill of materials." },
  { n: "02", name: "Quote back in 15 minutes", line: "A named specialist returns pricing, availability and lead time in writing." },
  { n: "03", name: "Order if it works", line: "No obligation. No account. The person who quoted it sees it shipped." },
];

// `?partNumber=` arrives from the sitewide closing CTA and the sidebar RFQ widget,
// so whatever the visitor typed there is already in the form when they land.
export default function StraightRfqPage({ searchParams }) {
  const initialPart = typeof searchParams?.partNumber === "string" ? searchParams.partNumber : "";
  return (
    <>
      {/* ============ 01 · HERO — editorial statement ============ */}
      <header className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className="eyebrow">Straight RFQ</p>
          <h1 className={styles.heroTitle}>
            Send the part numbers.
            <br />
            We&apos;ll do <em>the hard part.</em>
          </h1>
          <p className={styles.heroSub}>
            Pricing, availability, condition and lead time in writing within 15 minutes, from a
            named specialist. No account, no sign-up, no sales call first.
          </p>
          <ul className={styles.heroMeta} aria-label="What to expect">
            <li><span className={styles.metaDot} aria-hidden="true" />15-minute response</li>
            <li>24 / 7 AOG desk</li>
            <li>Full traceability</li>
          </ul>
        </div>
      </header>

      {/* ============ 02 · FORM + rail ============ */}
      <section className={styles.rfq} aria-labelledby="rfq-title">
        <div className={`container ${styles.rfqGrid}`}>
          <div className={styles.formCol}>
            <h2 className={styles.visuallyHidden} id="rfq-title">Request a quote</h2>
            <div className={styles.panel}>
              <RfqForm initialPart={initialPart} />
            </div>
          </div>

          <aside className={styles.rail}>
            <div className={styles.railBlock}>
              <p className="eyebrow">What happens next</p>
              <ol className={styles.steps}>
                {STEPS.map((s) => (
                  <li key={s.n} className={styles.step}>
                    <span className={styles.stepNo}>{s.n}</span>
                    <div>
                      <h3 className={styles.stepName}>{s.name}</h3>
                      <p className={styles.stepLine}>{s.line}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.urgent}>
              <p className={styles.urgentKicker}>
                <span className={styles.urgentPulse} aria-hidden="true" />
                Grounded aircraft?
              </p>
              <p className={styles.urgentText}>
                Don&apos;t wait on a form. The desk is staffed continuously. An AOG request is worked
                the minute it lands.
              </p>
              <a className={styles.urgentCall} href="tel:1-714-705-4780">
                <span className={styles.urgentCallLabel}>Call the desk</span>
                <span className={styles.urgentCallNum}>+1 (714) 705-4780</span>
              </a>
            </div>

            <CertBadges
              className={styles.trust}
              title="Quoted against these standards"
              note="Certificate copies travel with the quote on request."
              variant="bare"
            />
          </aside>
        </div>
      </section>
    </>
  );
}
