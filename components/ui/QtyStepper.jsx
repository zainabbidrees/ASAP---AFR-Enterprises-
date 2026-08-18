"use client";

// The site's one quantity control: − [n] +.
//
// Deliberately not a bare <input type="number">. The native spinners are
// OS-drawn, hover-only and about 10px tall — off-brand for the monochrome
// system and far below the 44px touch target the rest of the site holds to.
// So the real numeric input stays (keypad on mobile, arrow keys, screen-reader
// semantics) and its spinners are hidden in favour of two proper buttons.

import { useEffect, useState } from "react";
import styles from "./QtyStepper.module.css";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const asDraft = (v) => (v === "" || v === null || v === undefined ? "" : String(v));

export default function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 999999,
  step = 1,
  size = "md",
  full = false,
  bare = false,
  allowEmpty = false,
  placeholder,
  label = "Quantity",
  decrementLabel,
  incrementLabel,
  onMinDecrement,
  onBlur,
  className = "",
}) {
  // Typing is buffered: the field has to be emptiable mid-edit ("4" → "" → "12")
  // without committing a 0 on the way through.
  const [draft, setDraft] = useState(() => asDraft(value));

  useEffect(() => {
    setDraft(asDraft(value));
  }, [value]);

  const parsedValue = Number(value);
  const committed =
    value === "" || value === null || value === undefined || !Number.isFinite(parsedValue)
      ? null
      : parsedValue;

  const atMin = committed === null || committed <= min;
  const atMax = committed !== null && committed >= max;

  const handleChange = (e) => {
    const raw = e.target.value;
    setDraft(raw);

    if (raw.trim() === "") {
      if (allowEmpty) onChange("");
      return;
    }
    const parsed = parseInt(raw.replace(/[^\d]/g, ""), 10);
    if (!Number.isFinite(parsed)) return;
    // Nothing below min is ever committed — and holding the draft rather than
    // snapping it up keeps the caret where the buyer left it mid-number.
    if (parsed < min) return;
    onChange(Math.min(parsed, max));
  };

  // An abandoned half-edit must never linger in the field.
  const handleBlur = (e) => {
    setDraft(asDraft(value));
    onBlur?.(e);
  };

  const decrement = () => {
    if (atMin) {
      // How a cart line decrements itself out of existence.
      onMinDecrement?.();
      return;
    }
    onChange(clamp(committed - step, min, max));
  };

  const increment = () => {
    if (committed === null) {
      onChange(clamp(min, min, max));
      return;
    }
    onChange(clamp(committed + step, min, max));
  };

  return (
    <div
      className={`${styles.group} ${className}`}
      // Focus ring belongs to the whole control, not the borderless input
      // rattling around inside it.
      role="group"
      aria-label={label}
      data-size={size === "sm" ? "sm" : "md"}
      data-full={full ? "true" : undefined}
      data-bare={bare ? "true" : undefined}
    >
      <button
        type="button"
        className={styles.step}
        onClick={decrement}
        disabled={atMin && !onMinDecrement}
        aria-label={decrementLabel || `Decrease ${label.toLowerCase()}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 12h14" />
        </svg>
      </button>

      <input
        className={styles.input}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={step}
        value={draft}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-label={label}
      />

      <button
        type="button"
        className={styles.step}
        onClick={increment}
        disabled={atMax}
        aria-label={incrementLabel || `Increase ${label.toLowerCase()}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
