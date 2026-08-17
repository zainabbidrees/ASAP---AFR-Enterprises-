"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

// Count-up on scroll-into-view. Writes straight to the DOM (no per-frame
// setState), with a setTimeout safety net so final values land even when the
// browser throttles rAF. Reduced-motion keeps the final numbers static.
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
  setTimeout(() => (el.textContent = fmt(target, format)), dur + 250);
}

export default function StatsCounter({ stats }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return; // keep final values

    const els = Array.from(root.querySelectorAll("[data-count]"));
    els.forEach((el) => (el.textContent = fmt(0, el.dataset.format)));

    let done = false;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done) {
            done = true;
            obs.disconnect();
            els.forEach((el) => countUp(el, Number(el.dataset.count), el.dataset.format));
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`container ${styles.statsGrid}`} ref={ref}>
      {stats.map((s, i) => (
        <div key={i} className={styles.statCell}>
          <div className={styles.statFigure}>
            {s.display ? (
              /* A word-figure ("24/7/365"), not a counted numeral — its own size so
                 it sits level with the numbers instead of overrunning the cell. */
              <span className={`${styles.statNum} ${styles.statText}`}>{s.display}</span>
            ) : (
              <>
                <span className={styles.statNum} data-count={s.count} data-format={s.format || ""}>
                  {s.format === "comma" ? Number(s.count).toLocaleString() : s.count}
                </span>
                {s.suffix && <span className={styles.statSuffix}>{s.suffix}</span>}
              </>
            )}
          </div>
          <div className={styles.statLabel}>
            {s.live && <span className={styles.statLive} aria-hidden="true" />}
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
