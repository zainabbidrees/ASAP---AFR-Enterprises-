"use client";

import Link from "next/link";
import { useState } from "react";
import QuoteCheckout from "@/components/cart/QuoteCheckout";
import styles from "./page.module.css";

// The cart page: a checkout, not a landing page.
//
// One column, one form, two numbered steps, one send button. Everything needed
// to get a quote is on this screen — the buyer used to have to leave for
// /straightrfq/ and retype every part number they had just staged.
export default function CartView() {
  const [sent, setSent] = useState(null);

  if (sent) return <QuoteSent {...sent} />;

  return (
    <section className={styles.page} aria-labelledby="cart-title">
      <div className="container">
        <div className={styles.column}>
          <header className={styles.head}>
            <p className="eyebrow">Quote builder</p>
            <h1 className={styles.title} id="cart-title">
              Your RFQ cart
            </h1>
            <p className={styles.lede}>
              Build a multi-part quote with no prices and no checkout. Add lines below or
              import a BOM, then submit them all as one request. We&apos;ll quote every line
              within 15 minutes.
            </p>
          </header>

          <QuoteCheckout onSent={setSent} />
        </div>
      </div>
    </section>
  );
}

// Confirmation. Replaces the whole checkout: the lines are on a specialist's
// desk now, so leaving an emptied cart on screen would read as data loss.
function QuoteSent({ reference, aog, count, parts, lines }) {
  return (
    <section className={styles.page} aria-labelledby="sent-title">
      <div className="container">
        <div className={styles.sent} role="status">
          <span className={styles.sentRef} aria-hidden="true">{reference}</span>
          <span className={styles.sentMark} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          </span>
          <h1 className={styles.sentTitle} id="sent-title">
            {count} {count === 1 ? "line" : "lines"} sent for quote.
          </h1>
          <p className={styles.sentText}>
            {aog
              ? "Flagged AOG — a responder is already on it. Pricing and availability within 15 minutes, any hour."
              : "A named specialist is pricing it now. Availability, condition and lead time in writing within 15 minutes."}{" "}
            Grounded aircraft? Call <a href="tel:1-714-705-4780">+1&nbsp;(714)&nbsp;705-4780</a>.
          </p>

          <ul className={styles.sentLines}>
            {lines.map((l) => (
              <li key={l.partNumber}>
                <span className={styles.sentPart}>{l.partNumber}</span>
                <span className={styles.sentMfr}>{l.manufacturer || "Source to be advised"}</span>
                <span className={styles.sentQty}>× {l.qty}</span>
              </li>
            ))}
          </ul>
          <p className={styles.sentMeta}>
            {count} {count === 1 ? "line" : "lines"} · {parts} {parts === 1 ? "part" : "parts"} · reference {reference}
          </p>

          <Link className={styles.sentCta} href="/manufacturer/">
            Browse the catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
