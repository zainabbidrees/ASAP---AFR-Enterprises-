"use client";

import { useEffect, useRef } from "react";
import styles from "./StatsStrip.module.css";

// Live stats — hard numbers that prove inventory depth + response speed.
// Numbers count up when the band scrolls into view.
const STATS = [
  { count: 2, suffix: "B+", label: "Parts in inventory" },
  { count: 5000, format: "comma", suffix: "+", label: "Manufacturers" },
  { count: 15, suffix: "MIN", spaced: true, label: "RFQ response" },
  { display: "24/7/365", label: "Always on" },
];

function fmt(n, format) {
  return format === "comma" ? Math.round(n).toLocaleString() : String(Math.round(n));
}

function countUp(el, target, format) {
  const dur = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    el.textContent = fmt(target * eased, format);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = fmt(target, format);
  }
  requestAnimationFrame(tick);
  // safety net: guarantee the final value even if rAF is throttled
  setTimeout(() => (el.textContent = fmt(target, format)), dur + 250);
}

export default function StatsStrip() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return; // keep final values
    const els = Array.from(root.querySelectorAll("[data-count]"));
    els.forEach((el) => (el.textContent = fmt(0, el.dataset.format)));

    let io = null;
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      els.forEach((el) => countUp(el, Number(el.dataset.count), el.dataset.format));
    };
    const arm = () => {
      io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              obs.disconnect();
              run();
            }
          });
        },
        { threshold: 0.35 }
      );
      io.observe(root);
    };
    // This band is never at the very top of the page, so arm the in-view
    // observer immediately — it counts up when the band scrolls into view,
    // and fires right away if it's already visible (tall screens).
    arm();

    return () => {
      if (io) io.disconnect();
    };
  }, []);

  return (
    <section className={styles.strip} aria-label="Key statistics" ref={ref}>
      <div className={`container ${styles.inner}`}>
        {STATS.map((s) => (
          <div className={styles.stat} key={s.label}>
            <div className={styles.value}>
              {s.count != null ? (
                <span
                  className={styles.num}
                  data-count={s.count}
                  data-format={s.format || ""}
                >
                  {fmt(s.count, s.format)}
                </span>
              ) : (
                <span className={styles.num}>{s.display}</span>
              )}
              {s.suffix && (
                <span className={`${styles.suffix} ${s.spaced ? styles.suffixSpaced : ""}`}>
                  {s.suffix}
                </span>
              )}
            </div>
            <span className={styles.bar} aria-hidden="true" />
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
