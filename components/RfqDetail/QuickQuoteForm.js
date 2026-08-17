"use client";

import { useState } from "react";
import styles from "./RfqDetail.module.css";

// Part-scoped quote form. The part number and manufacturer arrive pre-filled and
// read-only-ish (editable, but the user shouldn't have to retype what they clicked)
// so the only real work left is quantity, date and contact details.
// Isolated client leaf — the surrounding page stays a server component.
const NEED_BY = [
  "Immediate",
  "Within 1 week",
  "Within 2 weeks",
  "Within 4 weeks",
  "Within 8 weeks",
  "Bid only",
  "End-of-life buy",
  "AOG — aircraft on ground",
];

const COMPANY_TYPES = [
  "Government agency",
  "Manufacturer",
  "Airline / charter operator",
  "Repair station",
  "Distributor / reseller",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function QuickQuoteForm({ part, manufacturer }) {
  const [form, setForm] = useState({
    part,
    manufacturer,
    qty: "",
    target: "",
    needBy: "Immediate",
    companyType: "",
    name: "",
    company: "",
    phone: "",
    email: "",
    comments: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [errors, setErrors] = useState({});
  const [ref, setRef] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate() {
    const e = {};
    if (!String(form.qty).trim()) e.qty = "Required";
    if (!form.name.trim()) e.name = "Required";
    if (!form.company.trim()) e.company = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!EMAIL_RE.test(form.email)) e.email = "Enter a valid email";
    if (!form.companyType) e.companyType = "Required";
    return e;
  }

  function onSubmit(e) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    // No backend yet — surface a reference so the flow reads as complete.
    setTimeout(() => {
      setRef(`AFR-${String(Math.abs(hash(form.part + form.email)) % 900000 + 100000)}`);
      setStatus("sent");
    }, 700);
  }

  if (status === "sent") {
    return (
      <div className={styles.sent} role="status">
        <p className={styles.sentHead}>Request received — reference {ref}</p>
        <p className={styles.sentBody}>
          A specialist is on {form.part} now. You&apos;ll have pricing, availability and lead time by
          email within 15 minutes during business hours. For an AOG, call{" "}
          <a href="tel:1-714-705-4780">+1 (714) 705-4780</a> and quote the reference above.
        </p>
        <button className={styles.reset} type="button" onClick={() => setStatus("idle")}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.grid}>
        <Field label="Part number" error={errors.part}>
          <input type="text" value={form.part} onChange={set("part")} />
        </Field>
        <Field label="Manufacturer">
          <input type="text" value={form.manufacturer} onChange={set("manufacturer")} />
        </Field>
        <Field label="Quantity (ea)" required error={errors.qty}>
          <input type="text" inputMode="numeric" value={form.qty} onChange={set("qty")} placeholder="e.g. 12" />
        </Field>
        <Field label="Target price (ea) USD">
          <input type="text" inputMode="decimal" value={form.target} onChange={set("target")} placeholder="Optional" />
        </Field>
        <Field label="Need parts by" required>
          <select value={form.needBy} onChange={set("needBy")}>
            {NEED_BY.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Company type" required error={errors.companyType}>
          <select value={form.companyType} onChange={set("companyType")}>
            <option value="">Select…</option>
            {COMPANY_TYPES.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Your name" required error={errors.name}>
          <input type="text" value={form.name} onChange={set("name")} />
        </Field>
        <Field label="Company name" required error={errors.company}>
          <input type="text" value={form.company} onChange={set("company")} />
        </Field>
        <Field label="Phone" required error={errors.phone}>
          <input type="tel" value={form.phone} onChange={set("phone")} />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input type="email" value={form.email} onChange={set("email")} />
        </Field>
      </div>

      <Field label="Comments">
        <textarea rows={3} value={form.comments} onChange={set("comments")} placeholder="Condition, certification or delivery notes" />
      </Field>

      <div className={styles.actions}>
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Get a quote"}
        </button>
        <p className={styles.note}>
          Required fields are marked *. We will not share your information with third parties.
        </p>
      </div>
    </form>
  );
}

function Field({ label, required, error, children }) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>
        {label} {required && <em aria-hidden="true">*</em>}
      </span>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
