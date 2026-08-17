"use client";

import { useEffect, useRef } from "react";
import styles from "./GlobalPresence.module.css";

// Global-network showcase: a dotted world map that leans toward the cursor.
// Mouse position is written to CSS variables via rAF (no React re-renders), and
// CSS handles the smoothed 3D tilt — keeps this cheap on every mousemove.

const STATS = [
  { n: "28", l: "Manufacturing Locations" },
  { n: "255+", l: "Service Centers" },
  { n: "3,135+", l: "Service Field Engineers" },
  { n: "415+", l: "Technical Support Personnel" },
  { n: "14", l: "Customer Experience Labs" },
];

// Breakdown for the pinned primary region — rendered in a card beside the map
// (never over the dots) and tied back to the US pin by a hairline leader.
const REGION = {
  name: "United States & Canada",
  rows: [
    { l: "Manufacturing Locations", n: "13" },
    { l: "Service Centers", n: "80+" },
    { l: "Service Field Engineers", n: "965+" },
    { l: "Technical Support Personnel", n: "145+" },
    { l: "Customer Experience Labs", n: "5" },
  ],
};

// Positions are % of the equirectangular map box: x=(lon+180)/360, y=(90-lat)/180.
const PINS = [
  { id: "us", x: 22.8, y: 28.3, primary: true },
  { id: "brazil", x: 35.8, y: 55.6 },
  { id: "europe", x: 52.8, y: 22.2 },
  { id: "india", x: 71.7, y: 37.8 },
  { id: "sea", x: 78.9, y: 49.4 },
  { id: "australia", x: 87.2, y: 63.9 },
];

// Stylised continent silhouettes (viewBox 1000×500, equirectangular). Filled
// with a dot pattern so they read as a dot-matrix world map.
const LAND = [
  "M33,67 L236,50 L333,83 L306,139 L275,181 L256,214 L208,194 L181,167 L156,133 L139,97 Z",
  "M292,222 L403,264 L389,306 L306,397 L297,361 L278,250 Z",
  "M456,153 L528,147 L592,164 L642,217 L617,256 L611,300 L561,347 L536,319 L478,236 L453,208 Z",
  "M489,100 L556,61 L611,125 L569,136 L533,133 L475,139 Z",
  "M611,83 L778,50 L889,61 L944,89 L839,153 L806,189 L717,228 L625,194 L583,144 Z",
  "M792,236 L845,247 L858,270 L806,272 L783,258 Z",
  "M817,283 L903,292 L917,356 L819,344 Z",
];

export default function GlobalPresence() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1 … 1
      const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", mx.toFixed(3));
        el.style.setProperty("--my", my.toFixed(3));
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className={styles.section} aria-labelledby="gp-title">
      <div className="container">
        <header className={styles.head}>
          <p className={styles.eyebrow}>Global network</p>
          <h2 className={styles.title} id="gp-title">Our global presence</h2>
          <p className={styles.sub}>Meeting our customers wherever they are.</p>
        </header>

        <ul className={styles.stats}>
          {STATS.map((s) => (
            <li key={s.l} className={styles.stat}>
              <span className={styles.num}>{s.n}</span>
              <span className={styles.tick} aria-hidden="true" />
              <span className={styles.label}>{s.l}</span>
            </li>
          ))}
        </ul>

        <div className={styles.stage}>
          <figure className={styles.callout}>
            <figcaption className={styles.calloutCard}>
              <span className={styles.calloutTick} aria-hidden="true" />
              <p className={styles.calloutTitle}>{REGION.name}</p>
              <ul className={styles.calloutList}>
                {REGION.rows.map((r) => (
                  <li key={r.l}>
                    <span>{r.l}</span>
                    <b>{r.n}</b>
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>

          <div className={styles.mapCol}>
            {/* leader from the card to the US pin — sits outside .tilt so it stays flat */}
            <span className={styles.leader} aria-hidden="true" />
            <div className={styles.tilt}>
              <svg className={styles.map} viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <defs>
                  <pattern id="gpDots" width="9" height="9" patternUnits="userSpaceOnUse">
                    <circle cx="4.5" cy="4.5" r="1.5" fill="currentColor" />
                  </pattern>
                </defs>
                {LAND.map((d, i) => (
                  <path key={i} d={d} fill="url(#gpDots)" />
                ))}
              </svg>

              <div className={styles.pins}>
                {PINS.map((p) => (
                  <span
                    key={p.id}
                    className={styles.pin}
                    data-primary={p.primary ? "true" : undefined}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    {p.primary && <span aria-hidden="true" />}
                    <i aria-hidden="true" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
