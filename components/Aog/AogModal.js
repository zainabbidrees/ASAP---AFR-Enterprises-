"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./AogModal.module.css";

// AOG request modal — opened by the header "AOG 24/7" button (and by any element
// carrying data-aog-open, so server-rendered CTAs can trigger it without turning
// into client components).
//
// Self-contained on purpose: it owns its own open state and listens for a window
// event, so it can be mounted once in the header and reached from anywhere.
// Field set is fixed by the AOG desk intake form — first/last name, phone, email,
// address, city, postal code, country, details, terms.
const OPEN_EVENT = "afr:aog-open";

export function openAogRequest() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_EVENT));
}

const COUNTRIES = [
  "United States",
  "Canada",
  "Mexico",
  "United Kingdom",
  "Ireland",
  "France",
  "Germany",
  "Netherlands",
  "Belgium",
  "Spain",
  "Portugal",
  "Italy",
  "Switzerland",
  "Austria",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Poland",
  "Czechia",
  "Turkey",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Israel",
  "India",
  "Singapore",
  "Malaysia",
  "Japan",
  "South Korea",
  "Australia",
  "New Zealand",
  "Brazil",
  "Chile",
  "Colombia",
  "Argentina",
  "South Africa",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY = {
  first: "",
  last: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  postal: "",
  country: "United States",
  details: "",
  terms: false,
};

export default function AogModal() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [ref, setRef] = useState("");

  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const returnFocusRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  // ---- Opening: window event + delegated [data-aog-open] clicks -------------
  useEffect(() => {
    function onOpen() {
      returnFocusRef.current = document.activeElement;
      setOpen(true);
    }
    function onDocClick(e) {
      const trigger = e.target.closest?.("[data-aog-open]");
      if (!trigger) return;
      e.preventDefault();
      returnFocusRef.current = trigger;
      setOpen(true);
    }
    window.addEventListener(OPEN_EVENT, onOpen);
    document.addEventListener("click", onDocClick);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  // ---- Escape to close, scroll lock, focus in / focus back -----------------
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      // Keep tabbing inside the dialog.
      const focusables = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown, true);
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 40);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown, true);
      window.clearTimeout(t);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) return;
    // Reset back to a clean form once closed, and hand focus back to the trigger.
    const el = returnFocusRef.current;
    if (el && typeof el.focus === "function") el.focus();
    setStatus("idle");
    setErrors({});
    setValues(EMPTY);
  }, [open]);

  function setField(key, val) {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function validate(v) {
    const next = {};
    if (!v.first.trim()) next.first = "Required";
    if (!v.last.trim()) next.last = "Required";
    if (!v.phone.trim()) next.phone = "Required — the desk calls back on this.";
    if (!v.email.trim()) next.email = "Required";
    else if (!EMAIL_RE.test(v.email)) next.email = "That email looks off.";
    if (!v.city.trim()) next.city = "Required";
    if (!v.postal.trim()) next.postal = "Required";
    if (!v.country.trim()) next.country = "Required";
    if (!v.terms) next.terms = "Please accept the terms to send the request.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const el = dialogRef.current?.querySelector('[data-invalid="true"]');
      if (el) el.focus();
      return;
    }
    setStatus("sending");
    setRef("AOG-" + Date.now().toString(36).slice(-5).toUpperCase());
    window.setTimeout(() => setStatus("sent"), 1100);
  }

  if (!open) return null;

  const sending = status === "sending";

  // Portalled to <body>: the header slides on scroll (transform), which would
  // otherwise drag a position:fixed overlay with it.
  return createPortal(
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="aog-modal-title"
        ref={dialogRef}
      >
        <button type="button" className={styles.close} onClick={close} aria-label="Close AOG request">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className={styles.inner}>
          {/* ---- Left: the desk ---- */}
          <div className={styles.copy}>
            <p className={styles.status}>
              <span className={styles.pulse} aria-hidden="true" />
              AOG desk, staffed now
            </p>
            <h2 className={styles.title} id="aog-modal-title">
              Aircraft on ground. We move now.
            </h2>
            <p className={styles.text}>
              An AOG situation is disruptive and expensive without the right support behind it. Our
              desk is staffed every hour of every day. Call and speak to a specialist, or send the
              details and we will come back to you.
            </p>

            <p className={styles.callLabel}>Fastest route: call the AOG desk</p>
            <a className={styles.call} href="tel:1-714-705-4780">
              <span className={styles.callIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 4.5h3.2l1.2 4-2 1.3a12 12 0 0 0 5 5l1.3-2 4 1.2v3.2a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 2.5 6.7a2 2 0 0 1 2-2.2Z" />
                </svg>
              </span>
              <span className={styles.callNumber}>+1-714-705-4780</span>
            </a>

            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt>First response</dt>
                <dd>15 minutes</dd>
              </div>
              <div className={styles.stat}>
                <dt>Desk hours</dt>
                <dd>24/7 &times; 365</dd>
              </div>
              <div className={styles.stat}>
                <dt>Fulfillment</dt>
                <dd>100% U.S.A.</dd>
              </div>
            </dl>
          </div>

          {/* ---- Right: the intake form ---- */}
          <div className={styles.panel}>
            {status === "sent" ? (
              <div className={styles.sent} role="status">
                <span className={styles.sentIndex} aria-hidden="true">{ref}</span>
                <span className={styles.sentMark} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <h3 className={styles.sentTitle}>The desk has it.</h3>
                <p className={styles.sentText}>
                  A responder is on it now and will come back within 15 minutes. If the aircraft is
                  waiting, call <a href="tel:1-714-705-4780">+1-714-705-4780</a> and quote{" "}
                  {ref}.
                </p>
                <button type="button" className={styles.sentReset} onClick={close}>
                  Close
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.panelHead}>
                  <h3 className={styles.panelTitle}>Request immediate AOG support</h3>
                  <p className={styles.reqNote}>
                    <span aria-hidden="true">*</span> Required
                  </p>
                </div>

                <div className={styles.row}>
                  <Field id="aog-first" label="First name" required error={errors.first}>
                    <input
                      id="aog-first"
                      name="first"
                      type="text"
                      autoComplete="given-name"
                      className={styles.input}
                      value={values.first}
                      onChange={(e) => setField("first", e.target.value)}
                      data-invalid={errors.first ? "true" : undefined}
                      ref={firstFieldRef}
                    />
                  </Field>
                  <Field id="aog-last" label="Last name" required error={errors.last}>
                    <input
                      id="aog-last"
                      name="last"
                      type="text"
                      autoComplete="family-name"
                      className={styles.input}
                      value={values.last}
                      onChange={(e) => setField("last", e.target.value)}
                      data-invalid={errors.last ? "true" : undefined}
                    />
                  </Field>
                </div>

                <div className={styles.row}>
                  <Field id="aog-phone" label="Phone number" required error={errors.phone}>
                    <input
                      id="aog-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 714 705 4780"
                      className={styles.input}
                      value={values.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      data-invalid={errors.phone ? "true" : undefined}
                    />
                  </Field>
                  <Field id="aog-email" label="Email address" required error={errors.email}>
                    <input
                      id="aog-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={styles.input}
                      value={values.email}
                      onChange={(e) => setField("email", e.target.value)}
                      data-invalid={errors.email ? "true" : undefined}
                    />
                  </Field>
                </div>

                <div className={styles.row}>
                  <Field id="aog-address" label="Address">
                    <input
                      id="aog-address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      placeholder="Hangar, FBO, or street"
                      className={styles.input}
                      value={values.address}
                      onChange={(e) => setField("address", e.target.value)}
                    />
                  </Field>
                  <Field id="aog-city" label="City" required error={errors.city}>
                    <input
                      id="aog-city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      className={styles.input}
                      value={values.city}
                      onChange={(e) => setField("city", e.target.value)}
                      data-invalid={errors.city ? "true" : undefined}
                    />
                  </Field>
                </div>

                <div className={styles.row}>
                  <Field id="aog-postal" label="Postal code" required error={errors.postal}>
                    <input
                      id="aog-postal"
                      name="postal"
                      type="text"
                      autoComplete="postal-code"
                      className={styles.input}
                      value={values.postal}
                      onChange={(e) => setField("postal", e.target.value)}
                      data-invalid={errors.postal ? "true" : undefined}
                    />
                  </Field>
                  <Field id="aog-country" label="Country" required error={errors.country}>
                    <div className={styles.selectWrap}>
                      <select
                        id="aog-country"
                        name="country"
                        autoComplete="country-name"
                        className={`${styles.input} ${styles.select}`}
                        value={values.country}
                        onChange={(e) => setField("country", e.target.value)}
                        data-invalid={errors.country ? "true" : undefined}
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </Field>
                </div>

                <Field
                  id="aog-details"
                  label="Details"
                  help="Part number, NSN, tail number, or what failed. Whatever you have."
                >
                  <textarea
                    id="aog-details"
                    name="details"
                    rows={3}
                    placeholder="e.g. MS27473T10B35S, qty 2, A320 tail N123AB, on stand at KLAX"
                    className={`${styles.input} ${styles.textarea}`}
                    value={values.details}
                    onChange={(e) => setField("details", e.target.value)}
                  />
                </Field>

                <div className={styles.consent}>
                  <label className={styles.check} htmlFor="aog-terms">
                    <input
                      id="aog-terms"
                      name="terms"
                      type="checkbox"
                      checked={values.terms}
                      onChange={(e) => setField("terms", e.target.checked)}
                      data-invalid={errors.terms ? "true" : undefined}
                    />
                    <span>
                      All quotes and sales are subject to ASAP Semiconductor&apos;s{" "}
                      <a
                        href="https://www.asapsemi.com/customer-terms-and-conditions/"
                        target="_blank"
                        rel="noopener"
                      >
                        terms and conditions
                      </a>
                      . We never share your information.
                    </span>
                  </label>
                  {errors.terms && <p className={styles.error}>{errors.terms}</p>}
                </div>

                <div className={styles.foot}>
                  <button
                    type="submit"
                    className={styles.submit}
                    disabled={sending}
                    data-sending={sending ? "true" : undefined}
                  >
                    {sending ? (
                      <>
                        <span className={styles.spinner} aria-hidden="true" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send AOG request
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className={styles.footNote}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7.5V12l3 2" />
                    </svg>
                    First response within 15 minutes
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Field — micro-label above the control, error/help beneath.
function Field({ id, label, required, error, help, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.req} aria-hidden="true">*</span>}
      </label>
      {children}
      {error ? <p className={styles.error}>{error}</p> : help ? <p className={styles.help}>{help}</p> : null}
    </div>
  );
}
