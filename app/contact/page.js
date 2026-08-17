import Link from "next/link";
import GlobalPresence from "@/components/home/GlobalPresence";
import PageHero from "@/components/PageHero/PageHero";
import FinalCta from "@/components/FinalCta/FinalCta";
import ContactForm from "./ContactForm";
import CopyButton from "./CopyButton";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact Us | Electronic Parts, IT Hardware and Aircraft Components | AFR Enterprises",
  description:
    "Reach AFR Enterprises about aviation, electronic and IT hardware parts. General enquiries answered within one business day; the AOG desk is staffed 24/7/365 at +1 (714) 705-4780.",
};

// The four direct lines — rendered as an editorial hairline directory (not a
// timeline). The AOG desk is the one row allowed the reserved --urgent accent.
const CHANNELS = [
  {
    id: "aog",
    kicker: "Quoting & AOG desk",
    value: "+1 (714) 705-4780",
    href: "tel:1-714-705-4780",
    copy: "+1 (714) 705-4780",
    copyLabel: "Copy",
    note: "A person answers, 24 hours a day, every day of the year. For a grounded aircraft this is the single fastest route on the page.",
    mono: true,
    urgent: true,
  },
  {
    id: "sales",
    kicker: "Sales & quotes",
    value: "sales@afrenterprises.com",
    href: "mailto:sales@afrenterprises.com",
    copy: "sales@afrenterprises.com",
    copyLabel: "Copy",
    note: "Quotes, orders, order status, certificate copies and vendor set-up.",
    mono: true,
  },
  {
    id: "purchasing",
    kicker: "Purchasing",
    value: "purchase@afrenterprises.com",
    href: "mailto:purchase@afrenterprises.com",
    copy: "purchase@afrenterprises.com",
    copyLabel: "Copy",
    note: "Offering us inventory, supplier applications, quality-system and audit enquiries.",
    mono: true,
  },
  {
    id: "address",
    kicker: "Ship, receive & inspect",
    value: "1341 South Sunkist Street, Anaheim, CA 92806",
    href: "https://maps.google.com/?q=1341+South+Sunkist+Street+Anaheim+CA+92806",
    copy: "1341 South Sunkist Street, Anaheim, CA 92806, United States",
    copyLabel: "Copy",
    note: "Deliveries should reference the purchase-order number on the outer packaging.",
  },
];

// Marquee keywords (duplicated in markup for a seamless CSS loop).
const TICKER = [
  "General enquiries",
  "AOG desk 24/7/365",
  "15-minute RFQ",
  "Anaheim, California",
  "AS9120B certified",
  "Certificate copies",
];


export default function ContactPage() {
  return (
    <>
      {/* ============ 01 · HERO — shared <PageHero /> (type-led, no imagery) ============ */}
      <PageHero
        eyebrow="Contact AFR Enterprises"
        title={
          <>
            Talk to a person
            <br />
            who knows <em>the&nbsp;part.</em>
          </>
        }
        lede="Aviation, electronic and IT hardware — orders, certificates, vendor set-up, or a jet on the ground. Every message reaches a named representative, never a queue."
        actions={[
          { label: "Request a quote", href: "/straightrfq/", variant: "primary" },
          { label: "Call the AOG desk", href: "tel:1-714-705-4780", variant: "ghost", tel: true },
        ]}
      />

      {/* ============ 02 · GENERAL ENQUIRIES — form + AOG aside (non-sticky) ============ */}
      <section className={styles.enquiries} aria-labelledby="enquiries-title">
        <div className={`container ${styles.enquiriesGrid}`}>
          <div className={styles.formCol}>
            <div className={styles.sectionHead}>
              <div>
                <p className="eyebrow">General enquiries</p>
                <h2 className={styles.blockTitle} id="enquiries-title">
                  Not a part request?
                  <br />
                  Send it here.
                </h2>
              </div>
            </div>
            <p className={styles.blockLede}>
              Orders, invoices, vendor set-up, certificates and careers — answered within one
              business day. For pricing or availability, the{" "}
              <Link href="/straightrfq/">quote form</Link> is far faster.
            </p>
            <ContactForm />
          </div>

          <aside className={styles.aogCard}>
            <p className={styles.aogKicker}>
              <span className={styles.aogPulse} aria-hidden="true" />
              If it becomes urgent
            </p>
            <p className={styles.aogText}>
              Don&apos;t wait on an inbox. The desk is staffed continuously and an AOG request is
              worked the moment it lands.
            </p>
            <a className={styles.aogCall} href="tel:1-714-705-4780">
              <span className={styles.aogCallLabel}>Call the desk</span>
              <span className={styles.aogCallNum}>+1 (714) 705-4780</span>
            </a>
            <ul className={styles.aogPoints}>
              <li>Priority handling</li>
              <li>Dedicated responder</li>
              <li>15-minute response</li>
            </ul>
            <p className={styles.aogFoot}>
              Guaranteed 15-minute response — a named address, never a no-reply.
            </p>
          </aside>
        </div>
      </section>

      {/* ============ GLOBAL PRESENCE — dotted world map with mouse-tilt ============ */}
      <GlobalPresence />

      {/* ============ DIRECT LINES — editorial hairline directory ============ */}
      <section className={styles.direct} aria-labelledby="direct-title">
        <div className={`container ${styles.directGrid}`}>
          <div className={styles.directIntro}>
            <p className="eyebrow">Direct lines</p>
            <h2 className={styles.blockTitle} id="direct-title">
              Four ways to reach
              <br />
              a real person.
            </h2>
            <p className={styles.blockLede}>
              Every value is paste-ready — the copy controls write straight to your clipboard, so
              nothing reaches your purchase order retyped.
            </p>
          </div>

          <ol className={styles.directory}>
            {CHANNELS.map((c) => (
              <li key={c.id} className={styles.row} data-urgent={c.urgent ? "true" : undefined}>
                <p className={styles.rowKicker}>{c.kicker}</p>
                <div className={styles.rowLine}>
                  <a
                    className={`${styles.rowValue} ${c.mono ? styles.mono : ""}`}
                    href={c.href}
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    {c.value}
                  </a>
                  <CopyButton value={c.copy} label={c.copyLabel} />
                </div>
                <p className={styles.rowNote}>{c.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ CLOSE — shared sitewide final CTA ============ */}
      <FinalCta />
    </>
  );
}
