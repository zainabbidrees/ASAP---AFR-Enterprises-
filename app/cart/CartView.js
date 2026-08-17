"use client";

import Link from "next/link";
import { useQuoteCart, removeLine, setQty, clearCart } from "@/components/cart/quoteCart";
import styles from "./page.module.css";

// The cart's first section. Client-side because the staged lines live in
// localStorage: the copy, the counts and the manifest all read the same store.
// Empty is the first-render state (and the server snapshot), so the editorial
// empty state below is what search engines and no-JS visitors see.
export default function CartView() {
  const lines = useQuoteCart();
  const count = lines.length;
  const parts = lines.reduce((n, l) => n + l.qty, 0);
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className={styles.cart} aria-labelledby="cart-title">
      <div className={`container ${styles.cartGrid}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Quote cart</p>
          {count === 0 ? (
            <h1 className={styles.title} id="cart-title">
              Nothing staged
              <br />
              for quote — <em>yet.</em>
            </h1>
          ) : (
            <h1 className={styles.title} id="cart-title">
              {count} {count === 1 ? "line" : "lines"} staged
              <br />
              — <em>send them over.</em>
            </h1>
          )}
          <p className={styles.sub}>
            {count === 0
              ? "Add part numbers as you find them and they collect here, ready to send in one go. Or skip the browsing entirely — hand a specialist the numbers and get pricing, availability, condition and lead time in writing within 15 minutes."
              : "Send the manifest and a named specialist comes back with pricing, availability, condition and lead time in writing within 15 minutes. No account, no sign-up."}
          </p>
          <div className={styles.actions}>
            <Link className={styles.ctaPrimary} href="/straightrfq/">
              {count === 0 ? "Start an RFQ" : "Send for quote"}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link className={styles.ctaGhost} href="/manufacturer/">Browse the catalog</Link>
          </div>
          <p className={styles.meta}>
            <span>{count} {count === 1 ? "line" : "lines"}</span>
            <span className={styles.metaDiv} aria-hidden="true" />
            <span>{parts} {parts === 1 ? "part" : "parts"}</span>
            <span className={styles.metaDiv} aria-hidden="true" />
            <span>No account needed</span>
          </p>
        </div>

        <div
          className={styles.manifest}
          aria-label={count === 0 ? "Quote manifest, currently empty" : "Quote manifest"}
        >
          <div className={styles.manifestTop}>
            <span className={styles.manifestTag}>MANIFEST</span>
            <span className={styles.manifestCount}>
              {pad(count)} / {pad(parts)}
            </span>
          </div>
          <div className={styles.manifestHead} aria-hidden="true">
            <span>#</span>
            <span>Part number / NSN</span>
            <span>Qty</span>
            <span>Condition</span>
          </div>

          {count === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyMark} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16l-1.2 11.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 7Z" />
                  <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                </svg>
              </span>
              <p className={styles.emptyTitle}>No lines staged</p>
              <p className={styles.emptyText}>
                Parts you add will list here — part number, quantity and condition — priced in a
                single send.
              </p>
            </div>
          ) : (
            <>
              <ul className={styles.lines}>
                {lines.map((l, i) => (
                  <li className={styles.line} key={l.part}>
                    <span className={styles.lineNum} aria-hidden="true">{pad(i + 1)}</span>
                    <span className={styles.linePart}>
                      <Link className={styles.linePartLink} href={l.href}>{l.part}</Link>
                      {l.mfr && <span className={styles.lineMfr}>{l.mfr}</span>}
                    </span>
                    <span className={styles.lineQty}>
                      <label className="visually-hidden" htmlFor={`qty-${i}`}>
                        Quantity for {l.part}
                      </label>
                      <input
                        id={`qty-${i}`}
                        className={styles.qtyInput}
                        type="number"
                        min="1"
                        value={l.qty}
                        onChange={(e) => setQty(l.part, e.target.value)}
                      />
                    </span>
                    <span className={styles.lineEnd}>
                      <span className={styles.lineCond}>To quote</span>
                      <button
                        type="button"
                        className={styles.lineRemove}
                        onClick={() => removeLine(l.part)}
                        aria-label={`Remove ${l.part} from quote cart`}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                          <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
              <div className={styles.manifestActions}>
                <button type="button" className={styles.clearBtn} onClick={clearCart}>
                  Clear all
                </button>
              </div>
            </>
          )}

          <div className={styles.manifestFoot}>
            <span className={styles.live} aria-hidden="true" />
            Desk online · quotes back in 15 minutes
          </div>
        </div>
      </div>
    </section>
  );
}
