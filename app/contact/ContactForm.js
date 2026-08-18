"use client";

import { useState } from "react";
import styles from "./page.module.css";

// General-enquiries form — modern filled fields with leading icons, focus ring,
// inline validation and a three-phase submit (idle -> sending -> sent).
// Isolated leaf client component.
const TOPICS = [
  "Orders & invoices",
  "Vendor set-up",
  "Certificates & compliance",
  "Returns & warranty",
  "Careers",
  "Something else",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [errors, setErrors] = useState({});

  function validate(data) {
    const next = {};
    if (!data.name.trim()) next.name = "Tell us who to reply to.";
    if (!data.email.trim()) next.email = "We need an address to answer.";
    else if (!EMAIL_RE.test(data.email)) next.email = "That email looks off.";
    if (!data.company.trim()) next.company = "Add your company.";
    if (!data.topic) next.topic = "Pick the closest topic.";
    if (!data.question.trim()) next.question = "Add a line or two so we can route it.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: form.name.value,
      email: form.email.value,
      company: form.company.value,
      phone: form.phone.value,
      topic: form.topic.value,
      question: form.question.value,
    };
    const next = validate(data);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = form.querySelector(`[data-invalid="true"]`);
      if (first) first.focus();
      return;
    }
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1100);
  }

  if (status === "sent") {
    return (
      <div className={styles.sent} role="status">
        <span className={styles.sentIndex} aria-hidden="true">Received</span>
        <span className={styles.sentMark} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className={styles.sentTitle}>Your message is in.</h3>
        <p className={styles.sentText}>
          A named representative replies within one business day. Grounded aircraft or a stopped line?
          Call{" "}
          <a href="tel:1-714-705-4780">+1&nbsp;(714)&nbsp;705-4780</a>. The desk never closes.
        </p>
        <button type="button" className={styles.sentReset} onClick={() => setStatus("idle")}>
          Send another
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formRow}>
        <Field id="name" label="Full name" required error={errors.name} icon="user">
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Priya Nadkarni" className={styles.input} data-invalid={errors.name ? "true" : undefined} />
        </Field>
        <Field id="email" label="Work email" required error={errors.email} icon="mail">
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className={styles.input} data-invalid={errors.email ? "true" : undefined} />
        </Field>
      </div>

      <div className={styles.formRow}>
        <Field id="company" label="Company" required error={errors.company} icon="building">
          <input id="company" name="company" type="text" autoComplete="organization" placeholder="Where you buy for" className={styles.input} data-invalid={errors.company ? "true" : undefined} />
        </Field>
        <Field id="phone" label="Phone" optional icon="phone">
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" className={styles.input} />
        </Field>
      </div>

      <Field id="topic" label="What is this about?" required error={errors.topic} icon="tag">
        <select id="topic" name="topic" defaultValue="" className={`${styles.input} ${styles.select}`} data-invalid={errors.topic ? "true" : undefined}>
          <option value="" disabled>Select a topic</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <svg className={styles.selectChevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Field>

      <Field id="question" label="Your question" required error={errors.question} icon="message" area help="No passwords, card details or export-controlled data.">
        <textarea id="question" name="question" rows={4} placeholder="Order or quote numbers, part numbers, or your PO reference." className={`${styles.input} ${styles.textarea}`} data-invalid={errors.question ? "true" : undefined} />
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
                Send enquiry
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </>
            )}
          </span>
        </button>
        <p className={styles.formAlt}>
          Typical reply in <strong>one business day</strong> · or email{" "}
          <a href="mailto:sales@afrenterprises.com">sales@afrenterprises.com</a>
        </p>
      </div>
    </form>
  );
}

// Field — label above, clean bordered control, error/help below.
function Field({ id, label, required, optional, error, help, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.req} aria-hidden="true">*</span>}
        {optional && <span className={styles.opt}>optional</span>}
      </label>
      <div className={styles.control}>
        {children}
      </div>
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
