"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HowItWorks.module.css";

// How procurement works — 4 stages shown as an icon flow-rail (no numbering).
// Each cell rests airy on the surface and "materializes" into a card on hover,
// its icon chip filling ink. A connecting hairline threads the icons into a path.
//
// Focal motion: when the section lands in view, the pipeline "forms and powers
// on" — the connector line draws left→right and each stage arrives ink-lit, then
// cools to its resting chip, staggered to track the drawing line. Plays once.
// Reduced-motion / no-JS: everything is visible at rest (phase stays 'idle').
//
// The observer watches the RAIL, not the section: the section opens with a tall
// heading block, so watching it fired the reveal while the rail was still below
// the fold and the whole sequence was over before it came into view.
const STEPS = [
  {
    title: "Submit an RFQ",
    sub: "Send a part number, quantity, and target price — that's all we need to start.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 4h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
        <path d="M9.5 8.5h5M9.5 12h5M9.5 15.5h3" />
      </svg>
    ),
  },
  {
    title: "15-minute quote",
    sub: "Real pricing and an honest lead time land in your inbox — never a placeholder.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    ),
  },
  {
    title: "QA-vetted sourcing",
    sub: "Traceable, warrantied, AVL-only supply pulled from vendors we've vetted.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Expedited shipping",
    sub: "Domestic and international, AOG-ready — packed to spec when the clock matters.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6.5h9.5v9H3z" />
        <path d="M12.5 9H17l3.2 3.2V15.5h-7.7z" />
        <circle cx="7" cy="17.5" r="1.5" />
        <circle cx="17" cy="17.5" r="1.5" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const railRef = useRef(null);
  // 'idle' = visible at rest (SSR / no-JS / reduced-motion)
  // 'armed' = hidden, ready to run  ·  'in' = running the reveal
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Never hide content if the observer can't run — leave it visible at rest.
    if (!("IntersectionObserver" in window)) return;

    // Only arm if the rail actually starts below the fold — landing mid-page must
    // not hide content just to animate it back in.
    if (el.getBoundingClientRect().top < window.innerHeight - 170) return;

    setPhase("armed");

    let io;
    let fallback;
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      setPhase("in");
      io?.disconnect();
      clearTimeout(fallback);
    };

    io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) release();
      },
      // threshold 0 + a bottom inset: fires once the rail's top edge is ~170px
      // inside the viewport, which works at any rail height (4 columns on desktop,
      // 4 stacked rows on mobile) and guarantees it is actually on screen.
      { threshold: 0, rootMargin: "0px 0px -170px 0px" }
    );
    io.observe(el);

    // Safety net: a throttled or background tab can defer observer callbacks
    // indefinitely, and the armed state hides the stages. Release regardless.
    fallback = setTimeout(release, 6000);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const cls = [
    "section",
    styles.section,
    phase === "armed" && styles.prep,
    phase === "in" && styles.in,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={cls} aria-labelledby="how-title">
      <div className="container">
        <header className={styles.head}>
          <p className={styles.eyebrow}>The process</p>
          <h2 className={styles.title} id="how-title">How procurement works</h2>
          <p className={styles.lead}>
            From your part number to your dock — no black boxes, no runaround.
          </p>
        </header>

        <ul className={styles.rail} ref={railRef}>
          {STEPS.map((s) => (
            <li className={styles.step} key={s.title}>
              <span className={styles.icon} aria-hidden="true">{s.icon}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepSub}>{s.sub}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
