"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./PartsUniverse.module.css";

// Parts Universe — image-backed bento. Cards are compact (title only) until hover,
// then they enlarge and reveal the detail + a Generate RFQ button.
// Colour category photography sits behind a glass text panel (see the CSS).
//
// Focal motion: the photographs DEVELOP INTO THEIR FRAMES. Each tile's image wipes
// up through its own rounded frame (clip-path) while the photo settles from a
// slight over-scale and the scrim cools to its resting gradient — inventory
// becoming visible, window by window. Deliberately not the rise-and-stagger the
// adjacent HowItWorks section uses; two sections should not share one entrance.
//
// The observer watches the BENTO, not the section: watching the section fires the
// reveal while the grid is still below the fold (the bug just fixed next door).
// No JS / reduced motion: everything is visible at rest (phase stays 'idle').
const CATEGORIES = [
  { title: "Aviation & Aerospace", detail: "Aircraft components, engine parts, avionics, and fasteners for civil and defense fleets.", href: "/part-types/aviation/", img: "/cat-aviation.jpg", span: "big" },
  { title: "NSN / Military", detail: "National stock numbers, MIL-STD parts, and tactical hardware with full traceability.", href: "/nsn/", img: "/cat-nsn.jpg" },
  { title: "IT Hardware", detail: "Connectors, semiconductors, networking gear, and cables for enterprise IT.", href: "/part-types/hardware/", img: "/cat-it.jpg" },
  { title: "Semiconductors & ICs", detail: "Active and passive components, processors, and memory from vetted sources.", href: "/part-types/electronics/", img: "/cat-semiconductors.jpg", span: "wide" },
  { title: "Industrial & Automation", detail: "Sensors, relays, controls, and automation units for the plant floor.", href: "#", img: "/cat-industrial.jpg" },
  { title: "Board-Level Components", detail: "Resistors, capacitors, diodes, and microcontrollers by the reel or the piece.", href: "/part-types/electronics/", img: "/cat-board.jpg" },
  { title: "Connectors", detail: "Circular, rectangular, RF, backshells, and contacts across every series.", href: "/part-types/electronics/", img: "/cat-connectors.jpg" },
  { title: "Hard-to-Find & Obsolete", detail: "Long-lead, end-of-life, and discontinued line items others can't source.", href: "#", img: "/cat-obsolete.jpg" },
];

export default function PartsUniverse() {
  const bentoRef = useRef(null);
  // 'idle' = visible at rest (SSR / no-JS / reduced-motion)
  // 'armed' = framed shut, ready to run  ·  'in' = running the reveal
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const el = bentoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Never hide content if the observer can't run — leave it visible at rest.
    if (!("IntersectionObserver" in window)) return;

    // Only arm if the grid actually starts below the fold. Landing mid-page (a
    // deep link, a restored scroll position) means it is already on screen, and
    // hiding it just to animate it back would be a flash, not a reveal.
    if (el.getBoundingClientRect().top < window.innerHeight - 180) return;

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
      // threshold 0 + a bottom inset so it fires once the grid's top edge is well
      // inside the viewport — correct at any grid height (4 cols → 1 col).
      { threshold: 0, rootMargin: "0px 0px -180px 0px" }
    );
    io.observe(el);

    // Safety net: a background or throttled tab can defer observer callbacks
    // indefinitely. The armed state hides eight photo tiles, so release it
    // unconditionally rather than ever risk leaving the section blank.
    fallback = setTimeout(release, 6000);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const sectionCls = [
    "section",
    styles.section,
    phase === "armed" && styles.prep,
    phase === "in" && styles.in,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionCls} aria-labelledby="parts-universe-title">
      <div className="container">
        <header className={styles.head}>
          <div>
            <h2 className={styles.title} id="parts-universe-title">The parts we source</h2>
            <p className={styles.lead}>Browse by category, or jump straight to an RFQ.</p>
          </div>
          <Link className={styles.viewAll} href="/manufacturer/">View all categories &#8594;</Link>
        </header>

        <div className={styles.bento} ref={bentoRef}>
          {CATEGORIES.map((c) => (
            <article
              key={c.title}
              className={`${styles.tile} ${c.span ? styles[c.span] : ""}`}
              style={{ backgroundImage: `url(${c.img})` }}
            >
              <div className={styles.content}>
                <h3 className={styles.tileTitle}>
                  <Link className={styles.tileLink} href={c.href}>{c.title}</Link>
                </h3>
                <div className={styles.reveal}>
                  <p className={styles.detail}>{c.detail}</p>
                  <Link className={styles.rfq} href="/straightrfq/">Generate RFQ &#8594;</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
