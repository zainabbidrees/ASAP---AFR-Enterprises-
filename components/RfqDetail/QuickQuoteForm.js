"use client";

import { useRef, useState } from "react";
import BomUpload from "@/components/BomUpload/BomUpload";
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
  "AOG (aircraft on ground)",
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
  // Everything an uploaded BOM contained beyond the part this page is scoped to.
  const [extra, setExtra] = useState([]);
  const extraId = useRef(1);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // This page is already scoped to one part, so a BOM row matching it fills the
  // quantity above rather than duplicating itself into the list below.
  function addBomRows(rows) {
    const key = (s) => String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    const current = key(form.part);
    const rest = [];
    let matchedQty = "";

    rows.forEach((r) => {
      if (current && key(r.pn) === current) {
        if (!matchedQty && r.qty) matchedQty = r.qty;
        return;
      }
      rest.push(r);
    });

    // Resolved before any setState so nothing here depends on an updater
    // running exactly once.
    let promoted = null;
    let overflow = rest;
    if (!current && rest.length) {
      promoted = rest[0];
      overflow = rest.slice(1);
    }

    if (promoted) {
      setForm((f) => ({ ...f, part: promoted.pn, qty: String(f.qty).trim() || promoted.qty }));
    } else if (matchedQty) {
      setForm((f) => (String(f.qty).trim() ? f : { ...f, qty: matchedQty }));
    }

    if (overflow.length) {
      const tagged = overflow.map((r) => ({ ...r, id: extraId.current++ }));
      setExtra((cur) => [...cur, ...tagged]);
    }
    setErrors((e) => ({ ...e, part: undefined, qty: undefined }));
  }

  function validate() {
    const e = {};
    // Arrives pre-filled from the route, but it stays editable — so an emptied
    // field has to be caught rather than sending a quote request with no part.
    if (!String(form.part).trim()) e.part = "Required";
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
        <p className={styles.sentHead}>Request received. Reference {ref}</p>
        <p className={styles.sentBody}>
          A specialist is on {form.part}
          {extra.length > 0 && ` and the ${extra.length} other part${extra.length > 1 ? "s" : ""} on your list`} now.
          You&apos;ll have pricing, availability and lead time by
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
        <Field label="Part number" required error={errors.part}>
          <input type="text" value={form.part} onChange={set("part")} required aria-required="true" />
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

      <BomUpload onRows={addBomRows} label="Quoting more parts than this one?" className={styles.bom} />

      {extra.length > 0 && (
        <div className={styles.bomList}>
          <p className={styles.bomHead}>
            Also on this request — {extra.length} part{extra.length > 1 ? "s" : ""} from your list
          </p>
          <ul className={styles.bomRows}>
            {extra.map((r) => (
              <li key={r.id} className={styles.bomRow}>
                <span className={styles.bomPn}>{r.pn}</span>
                <span className={styles.bomMeta}>
                  {r.qty ? `Qty ${r.qty}` : "Qty not given"}
                  {r.condition ? ` · ${r.condition}` : ""}
                </span>
                <button
                  type="button"
                  className={styles.bomDrop}
                  onClick={() => setExtra((cur) => cur.filter((x) => x.id !== r.id))}
                  aria-label={`Remove ${r.pn} from this request`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

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
