"use client";

import { useRef, useState } from "react";
import BomUpload from "@/components/BomUpload/BomUpload";
import { CONDITIONS } from "@/lib/bom";
import styles from "./page.module.css";

// Straight RFQ form — a dynamic part-line repeater fed either by hand or from an
// uploaded bill of materials, an AOG priority toggle (the one control allowed the
// reserved --urgent accent), contact block and a three-phase submit
// (idle -> sending -> sent). Isolated leaf client component.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RfqForm({ initialPart = "" }) {
  const idRef = useRef(2);
  // Seeded from ?partNumber= so a part typed into the closing CTA or a sidebar
  // widget is already on the first line rather than needing to be retyped.
  const [lines, setLines] = useState([{ id: 1, pn: initialPart, qty: "", condition: "" }]);
  const [aog, setAog] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [errors, setErrors] = useState({});
  const [ref, setRef] = useState("");

  function addLine() {
    setLines((l) => [...l, { id: idRef.current++, pn: "", qty: "", condition: "" }]);
  }
  function removeLine(id) {
    setLines((l) => (l.length === 1 ? l : l.filter((x) => x.id !== id)));
    setErrors((e) => {
      const { [`pn-${id}`]: _a, [`qty-${id}`]: _b, ...rest } = e;
      return rest;
    });
  }
  function updateLine(id, key, val) {
    setLines((l) => l.map((x) => (x.id === id ? { ...x, [key]: val } : x)));
  }
  // A parsed BOM keeps any line the visitor already filled in and appends the
  // rest, so an uploaded list never silently wipes typed work.
  function addBomRows(rows) {
    setLines((cur) => {
      const kept = cur.filter((l) => l.pn.trim() || String(l.qty).trim() || l.condition);
      const added = rows.map((r) => ({
        id: idRef.current++,
        pn: r.pn,
        qty: r.qty,
        condition: CONDITIONS.includes(r.condition) ? r.condition : "",
      }));
      return [...kept, ...added];
    });
    setErrors({});
  }

  function stepQty(id, delta) {
    setLines((l) =>
      l.map((x) => {
        if (x.id !== id) return x;
        const next = Math.max(1, (parseInt(x.qty, 10) || 0) + delta);
        return { ...x, qty: String(next) };
      })
    );
  }

  function validate(contact) {
    const next = {};
    let partsBad = false;
    const first = lines[0];
    if (!first.pn.trim()) { next[`pn-${first.id}`] = true; partsBad = true; }
    if (!String(first.qty).trim()) { next[`qty-${first.id}`] = true; partsBad = true; }
    // A line counts as in use the moment any of its three controls is touched, so
    // a part number is required on it — including a line where only a condition
    // was picked, which would otherwise be dropped silently.
    lines.forEach((ln) => {
      const touched = ln.pn.trim() || String(ln.qty).trim() || ln.condition;
      if (!touched) return;
      if (!ln.pn.trim()) { next[`pn-${ln.id}`] = true; partsBad = true; }
      if (!String(ln.qty).trim()) { next[`qty-${ln.id}`] = true; partsBad = true; }
    });
    if (partsBad) next.parts = "Give every line a part number and a quantity.";
    if (!contact.name.trim()) next.name = "Tell us who to reply to.";
    if (!contact.email.trim()) next.email = "We need an address to send the quote.";
    else if (!EMAIL_RE.test(contact.email)) next.email = "That email looks off.";
    if (!contact.company.trim()) next.company = "Add your company.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const contact = {
      name: form.name.value,
      email: form.email.value,
      company: form.company.value,
      phone: form.phone.value,
      country: form.country.value,
      needby: form.needby.value,
      notes: form.notes.value,
    };
    const next = validate(contact);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const el = form.querySelector('[data-invalid="true"]');
      if (el) el.focus();
      return;
    }
    setStatus("sending");
    setRef("AFR-" + Date.now().toString(36).slice(-5).toUpperCase());
    window.setTimeout(() => setStatus("sent"), 1100);
  }

  if (status === "sent") {
    const count = lines.filter((l) => l.pn.trim()).length || 1;
    return (
      <div className={styles.sent} role="status">
        <span className={styles.sentIndex} aria-hidden="true">{ref}</span>
        <span className={styles.sentMark} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <h3 className={styles.sentTitle}>
          {count} part{count > 1 ? "s" : ""} in the queue.
        </h3>
        <p className={styles.sentText}>
          {aog
            ? "Flagged AOG. A responder is already on it. Expect pricing and availability within 15 minutes, any hour."
            : "A named specialist is pricing it now. Expect availability, condition and lead time in writing within 15 minutes."}{" "}
          Grounded aircraft? Call <a href="tel:1-714-705-4780">+1&nbsp;(714)&nbsp;705-4780</a>.
        </p>
        <button type="button" className={styles.sentReset} onClick={() => setStatus("idle")}>
          Start another request
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* ---- Parts ---- */}
      <fieldset className={styles.block}>
        <legend className={styles.legend}>
          <span className={styles.legendNo}>01</span>
          What do you need priced?
        </legend>

        <div className={styles.parts}>
          <div className={styles.partsHead} aria-hidden="true">
            <span>Part number / NSN<span className={styles.req}>*</span></span>
            <span>Qty<span className={styles.req}>*</span></span>
            <span>Condition</span>
            <span />
          </div>

          {lines.map((ln, i) => (
            <div className={styles.partLine} key={ln.id}>
              <div className={styles.control}>
                <input
                  aria-label={`Part number, line ${i + 1}`}
                  className={styles.input}
                  value={ln.pn}
                  onChange={(e) => updateLine(ln.id, "pn", e.target.value)}
                  placeholder="e.g. MS21042L3"
                  aria-required={i === 0 ? "true" : undefined}
                  data-invalid={errors[`pn-${ln.id}`] ? "true" : undefined}
                />
              </div>
              <div className={styles.control}>
                <div className={styles.qtyStepper} data-invalid={errors[`qty-${ln.id}`] ? "true" : undefined}>
                  <button
                    type="button"
                    className={styles.qtyStep}
                    onClick={() => stepQty(ln.id, -1)}
                    aria-label={`Decrease quantity, line ${i + 1}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14" /></svg>
                  </button>
                  <input
                    aria-label={`Quantity, line ${i + 1}`}
                    className={styles.qtyInput}
                    type="text"
                    inputMode="numeric"
                    value={ln.qty}
                    onChange={(e) => updateLine(ln.id, "qty", e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="Qty"
                  />
                  <button
                    type="button"
                    className={styles.qtyStep}
                    onClick={() => stepQty(ln.id, 1)}
                    aria-label={`Increase quantity, line ${i + 1}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                </div>
              </div>
              <div className={styles.control}>
                <select
                  aria-label={`Condition, line ${i + 1}`}
                  className={`${styles.input} ${styles.select}`}
                  value={ln.condition}
                  onChange={(e) => updateLine(ln.id, "condition", e.target.value)}
                >
                  <option value="">Any condition</option>
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <svg className={styles.selectChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </div>
              <button
                type="button"
                className={styles.lineRemove}
                onClick={() => removeLine(ln.id)}
                disabled={lines.length === 1}
                aria-label={`Remove line ${i + 1}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
          ))}

          {errors.parts && (
            <p className={styles.error}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h0" /></svg>
              {errors.parts}
            </p>
          )}

          <button type="button" className={styles.addPart} onClick={addLine}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
            Add another part
          </button>

          <BomUpload onRows={addBomRows} label="Quoting a whole bill of materials?" className={styles.bom} />
        </div>

        {/* AOG toggle — the single sanctioned use of the --urgent accent */}
        <button
          type="button"
          role="switch"
          aria-checked={aog}
          className={styles.aog}
          data-on={aog ? "true" : undefined}
          onClick={() => setAog((v) => !v)}
        >
          <span className={styles.aogSwitch} aria-hidden="true"><span className={styles.aogKnob} /></span>
          <span className={styles.aogBody}>
            <span className={styles.aogTitle}>
              <span className={styles.aogDot} aria-hidden="true" />
              Aircraft on ground (AOG)
            </span>
            <span className={styles.aogNote}>
              Jumps the queue straight to the 24/7 desk, worked the minute it lands.
            </span>
          </span>
        </button>
      </fieldset>

      {/* ---- Contact ---- */}
      <fieldset className={styles.block}>
        <legend className={styles.legend}>
          <span className={styles.legendNo}>02</span>
          Where should the quote go?
        </legend>

        <div className={styles.formRow}>
          <Field id="name" label="Full name" required error={errors.name}>
            <input id="name" name="name" type="text" autoComplete="name" placeholder="Priya Nadkarni" className={styles.input} data-invalid={errors.name ? "true" : undefined} />
          </Field>
          <Field id="email" label="Work email" required error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className={styles.input} data-invalid={errors.email ? "true" : undefined} />
          </Field>
        </div>

        <div className={styles.formRow}>
          <Field id="company" label="Company" required error={errors.company}>
            <input id="company" name="company" type="text" autoComplete="organization" placeholder="Who you buy for" className={styles.input} data-invalid={errors.company ? "true" : undefined} />
          </Field>
          <Field id="phone" label="Phone" optional>
            <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" className={styles.input} />
          </Field>
        </div>

        <div className={styles.formRow}>
          <Field id="country" label="Country" optional>
            <input id="country" name="country" type="text" autoComplete="country-name" defaultValue="United States" className={styles.input} />
          </Field>
          <Field id="needby" label="Need it by" optional help="Leave blank if there's no hard date.">
            <input id="needby" name="needby" type="date" className={styles.input} />
          </Field>
        </div>
      </fieldset>

      {/* ---- Notes ---- */}
      <Field id="notes" label="Anything else we should know?" optional help="Cert requirements, acceptable alternates, target price. No card details or export-controlled data.">
        <textarea id="notes" name="notes" rows={3} placeholder="Traceability back to source, alternates acceptable, target price…" className={`${styles.input} ${styles.textarea}`} />
      </Field>

      <div className={styles.formFoot}>
        <button type="submit" className={styles.submit} disabled={sending} data-sending={sending ? "true" : undefined}>
          <span className={styles.submitLabel}>
            {sending ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Sending
              </>
            ) : (
              <>
                Send request, quote back in 15 min
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </>
            )}
          </span>
        </button>
        <p className={styles.formAlt}>
          No account, no sales call. A named specialist replies. Or email{" "}
          <a href="mailto:sales@afrenterprises.com">sales@afrenterprises.com</a>
        </p>
      </div>
    </form>
  );
}

// Field — label above, clean control, error/help below.
function Field({ id, label, required, optional, error, help, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.req} aria-hidden="true">*</span>}
        {optional && <span className={styles.opt}>optional</span>}
      </label>
      <div className={styles.control}>{children}</div>
      {error ? (
        <p className={styles.error}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h0" /></svg>
          {error}
        </p>
      ) : help ? (
        <p className={styles.help}>{help}</p>
      ) : null}
    </div>
  );
}
