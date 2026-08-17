"use client";

import { useState } from "react";
import styles from "./page.module.css";

// Paste-ready copy control for the Direct-lines directory. Writes the raw value
// (number / email / address) straight to the clipboard and confirms inline for
// ~1.6s. Isolated leaf client component so the surrounding list stays static.
export default function CopyButton({ value, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      className={styles.copyBtn}
      onClick={copy}
      data-copied={copied ? "true" : undefined}
      aria-label={`${label}: ${value}`}
    >
      <span className={styles.copyBtnInner} aria-hidden="true">
        {copied ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </svg>
            {label}
          </>
        )}
      </span>
    </button>
  );
}
