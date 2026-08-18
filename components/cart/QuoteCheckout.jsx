"use client";

// The cart checkout — the manifest on the left, one submit panel on the right.
//
// Two things it deliberately avoids:
//  · Two side-by-side input cards competing for attention. The right column is
//    not a second form: it is the send, with the few details needed to reply.
//  · A second destination. "Send for quote" used to walk the buyer to
//    /straightrfq/ and drop the staged lines, so every part number had to be
//    typed again. The request goes out from here.
//
// No prices, subtotals or payment — a quote request, not an order.

import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { searchParts } from "@/lib/catalog";
import BomUpload from "@/components/BomUpload/BomUpload";
import CartTable from "@/components/cart/CartTable";
import styles from "./QuoteCheckout.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function QuoteCheckout({ onSent }) {
  const { items, count, addItem, clear } = useCart();
  const parts = useMemo(() => items.reduce((n, l) => n + l.qty, 0), [items]);

  const [aog, setAog] = useState(false);
  const [terms, setTerms] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending
  const [errors, setErrors] = useState({});

  const empty = count === 0;
  const sending = status === "sending";

  // The manifest has no submit of its own, so Enter inside it must never fire
  // the form's. The part-number input's own handler runs first and commits.
  const keepEnterInTable = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  // Every parsed BOM row becomes a cart line, exactly as if it had been typed
  // into the draft row.
  function addBomRows(rows) {
    rows.forEach((r) => {
      const partNumber = String(r.pn || "").trim();
      if (!partNumber) return;
      addItem({
        partNumber,
        manufacturer: "",
        description: searchParts(partNumber, 1)[0]?.description || "",
        qty: Number(r.qty) || 1,
        href: "",
      });
    });
  }

  function validate(contact) {
    const next = {};
    if (empty) next.parts = "Add at least one part before sending.";
    if (!contact.email.trim()) next.email = "We need an address to send the quote.";
    else if (!EMAIL_RE.test(contact.email)) next.email = "That email looks off.";
    if (!terms) next.terms = "Please accept the terms to send this RFQ.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const contact = {
      name: form["cart-name"].value,
      email: form["cart-email"].value,
      company: form["cart-company"].value,
      phone: form["cart-phone"].value,
    };

    const next = validate(contact);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Focus by name, not by [data-invalid]: setErrors hasn't rendered yet, so
      // that attribute isn't in the DOM on this tick.
      if (next.email) form["cart-email"].focus();
      else if (next.terms) form["cart-terms"].focus();
      return;
    }

    setStatus("sending");
    // Named `reference`, not `ref` — this object is spread onto a component, and
    // React would strip a `ref` key out of the props.
    const reference = "AFR-" + Date.now().toString(36).slice(-5).toUpperCase();
    window.setTimeout(() => {
      // Snapshot the manifest for the confirmation before emptying the cart —
      // these lines are on a specialist's desk now, not still staged.
      onSent?.({ reference, aog, count, parts, lines: items });
      clear();
      setStatus("idle");
    }, 1100);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* ============ LINES ============ */}
      <div className={styles.lines} onKeyDown={keepEnterInTable}>
        <BomUpload
          onRows={addBomRows}
          label="Have a BOM? Import it as cart lines."
          note="Drop a CSV or TXT here. Every row becomes a line below."
          actionLabel="Import BOM"
          className={styles.bom}
        />

        <div className={styles.linesHead}>
          <p className={styles.linesCount}>
            {count} {count === 1 ? "line" : "lines"} in this RFQ
          </p>
          {!empty && (
            <button type="button" className={styles.clearBtn} onClick={clear}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
              Clear all
            </button>
          )}
        </div>

        <div className={styles.tableCard}>
          <CartTable />
        </div>

        {errors.parts && (
          <p className={styles.error} role="alert">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h0" /></svg>
            {errors.parts}
          </p>
        )}
      </div>

      {/* ============ SUBMIT ============ */}
      <aside className={styles.submitCol}>
        <div className={styles.submitCard}>
          <div className={styles.submitHead}>
            <p className={styles.submitKicker}>Submit</p>
            <p className={styles.submitTitle}>
              {count} {count === 1 ? "line" : "lines"} <span aria-hidden="true">→</span>
              <span className="visually-hidden"> becomes </span> one RFQ
            </p>
          </div>

          <div className={styles.fields}>
            <Field id="cart-name" label="Full name">
              <input id="cart-name" name="cart-name" type="text" autoComplete="name" className={styles.input} />
            </Field>

            <Field id="cart-email" label="Work email" required error={errors.email}>
              <input
                id="cart-email"
                name="cart-email"
                type="email"
                autoComplete="email"
                className={styles.input}
                data-invalid={errors.email ? "true" : undefined}
                onChange={() => errors.email && setErrors((p) => ({ ...p, email: undefined }))}
              />
            </Field>

            <Field id="cart-company" label="Company">
              <input id="cart-company" name="cart-company" type="text" autoComplete="organization" className={styles.input} />
            </Field>

            <Field id="cart-phone" label="Phone">
              <input id="cart-phone" name="cart-phone" type="tel" autoComplete="tel" className={styles.input} />
            </Field>
          </div>

          <div className={styles.checks}>
            {/* AOG — the one sanctioned use of --urgent on this page. */}
            <label className={`${styles.check} ${styles.checkAog}`} htmlFor="cart-aog">
              <input
                id="cart-aog"
                name="cart-aog"
                type="checkbox"
                checked={aog}
                onChange={(e) => setAog(e.target.checked)}
              />
              <span>This is an AOG requirement</span>
            </label>

            <label className={styles.check} htmlFor="cart-terms">
              <input
                id="cart-terms"
                name="cart-terms"
                type="checkbox"
                checked={terms}
                onChange={(e) => {
                  setTerms(e.target.checked);
                  if (e.target.checked) setErrors((p) => ({ ...p, terms: undefined }));
                }}
                data-invalid={errors.terms ? "true" : undefined}
              />
              <span>
                I agree to the{" "}
                <a href="https://www.asapsemi.com/customer-terms-and-conditions/" target="_blank" rel="noopener">
                  terms
                </a>{" "}
                and <a href="/cookie-policy/">privacy policy</a>.
              </span>
            </label>
            {errors.terms && <p className={styles.error}>{errors.terms}</p>}
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={sending || empty}
            data-sending={sending ? "true" : undefined}
          >
            {sending ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Sending
              </>
            ) : empty ? (
              "Add a part to submit"
            ) : (
              <>
                Submit RFQ
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </>
            )}
          </button>

          <p className={styles.submitFoot}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6l-7-3Z" />
            </svg>
            Quotes back within 15 minutes.
          </p>
        </div>
      </aside>
    </form>
  );
}

function Field({ id, label, required, error, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.req} aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className={styles.error}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h0" /></svg>
          {error}
        </p>
      )}
    </div>
  );
}
