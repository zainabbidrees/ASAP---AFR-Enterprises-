"use client";

import { useId, useRef, useState } from "react";
import { parseBom, MAX_ROWS } from "@/lib/bom";
import styles from "./BomUpload.module.css";

// Bill-of-materials intake shared by every RFQ form. Collapsed it is a single
// dashed bar that already accepts a dropped file; opened it offers a file picker
// and a paste box, because half of the lists buyers send arrive in the body of
// an email rather than as an attachment.

const TEXT_EXT = /\.(csv|tsv|tab|txt|dat|prn|lst)$/i;
const SHEET_EXT = /\.(xlsx|xlsm|xls|ods|numbers)$/i;
const MAX_BYTES = 2 * 1024 * 1024;

const DEFAULT_NOTE =
  "Drop a CSV or text file, or paste the list — we'll fill the lines in for you.";

function UploadMark() {
  return (
    <svg className={styles.barIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 16V4M8 8l4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

export default function BomUpload({
  onRows,
  label = "Have a bill of materials?",
  note,
  // When set, the strip carries an explicit button instead of being one big
  // clickable bar — the cart needs a visible primary action next to its table.
  actionLabel,
  className = "",
}) {
  const inputRef = useRef(null);
  const paneId = useId();
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState(null); // { tone: "ok" | "bad", body }

  function ingest(raw, source) {
    const { rows, skipped, truncated } = parseBom(raw);
    if (!rows.length) {
      setMsg({ tone: "bad", body: "Couldn't find any part numbers in that. Check the file has one part per row." });
      return;
    }
    onRows(rows);
    const bits = [`Read ${rows.length} part${rows.length > 1 ? "s" : ""}${source ? ` from ${source}` : ""}.`];
    if (skipped) bits.push(`${skipped} row${skipped > 1 ? "s" : ""} skipped.`);
    if (truncated) bits.push(`First ${MAX_ROWS} kept — send the rest to sales@afrenterprises.com.`);
    setMsg({ tone: "ok", body: bits.join(" ") });
    setOpen(false);
    setText("");
  }

  function readFile(file) {
    if (!file) return;
    if (SHEET_EXT.test(file.name)) {
      setMsg({ tone: "bad", body: "Spreadsheets need saving as CSV first (File → Save As → CSV), or paste the rows below." });
      setOpen(true);
      return;
    }
    if (!TEXT_EXT.test(file.name) && !file.type.startsWith("text/")) {
      setMsg({ tone: "bad", body: "Use a CSV, TSV or plain-text list — or paste the rows below." });
      setOpen(true);
      return;
    }
    if (file.size > MAX_BYTES) {
      setMsg({ tone: "bad", body: "That file is over 2 MB. Email it to sales@afrenterprises.com instead." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => ingest(String(reader.result), file.name);
    reader.onerror = () => setMsg({ tone: "bad", body: "Couldn't read that file. Try pasting the rows below." });
    reader.readAsText(file);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    readFile(e.dataTransfer.files?.[0]);
  }

  return (
    <div
      className={`${styles.wrap} ${className}`.trim()}
      data-dragging={dragging ? "true" : undefined}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    >
      {actionLabel ? (
        <div className={`${styles.bar} ${styles.barStatic}`}>
          <UploadMark />
          <span className={styles.barText}>
            <span className={styles.barTitle}>{label}</span>
            <span className={styles.barNote}>
              {dragging ? "Drop it here" : note || DEFAULT_NOTE}
            </span>
          </span>
          <button
            type="button"
            className={styles.action}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={paneId}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 16V4M8 8l4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            {actionLabel}
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={styles.bar}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={paneId}
        >
          <UploadMark />
          <span className={styles.barText}>
            <span className={styles.barTitle}>{label}</span>
            <span className={styles.barNote}>
              {dragging ? "Drop it here" : note || DEFAULT_NOTE}
            </span>
          </span>
          <svg className={styles.barChevron} data-open={open ? "true" : undefined} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}

      {open && (
        <div className={styles.pane} id={paneId}>
          <div className={styles.paneRow}>
            <button type="button" className={styles.choose} onClick={() => inputRef.current?.click()}>
              Choose a file
            </button>
            <span className={styles.paneHint}>CSV, TSV or .txt — one part per row.</span>
          </div>

          <input
            ref={inputRef}
            type="file"
            className={styles.file}
            accept=".csv,.tsv,.tab,.txt,.dat,.prn,.lst,text/csv,text/plain,text/tab-separated-values"
            onChange={(e) => { readFile(e.target.files?.[0]); e.target.value = ""; }}
          />

          <label className={styles.pasteLabel} htmlFor={`${paneId}-paste`}>
            Or paste your list
          </label>
          <textarea
            id={`${paneId}-paste`}
            className={styles.paste}
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"MS21042L3, 100, New Surplus\nNAS1149F0332P, 25\nBACB30LH5-12 x 4"}
          />
          <button
            type="button"
            className={styles.parse}
            onClick={() => ingest(text, "your list")}
            disabled={!text.trim()}
          >
            Add these parts
          </button>
        </div>
      )}

      {msg && (
        <p className={styles.msg} data-tone={msg.tone} role="status">
          {msg.body}
        </p>
      )}
    </div>
  );
}
