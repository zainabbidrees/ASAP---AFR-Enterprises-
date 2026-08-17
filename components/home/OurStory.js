"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./OurStory.module.css";

// "Our story" — the whole statement sits in light gray, then darkens to black
// character by character (a left-to-right sweep) when the section lands in view.
// Each character carries an inline transition-delay = its index * CHAR_DELAY, so
// adding the .lit class fires the color change in sequence. Full text stays in
// the DOM (aria-label), so screen readers / no-JS / reduced-motion get it plain.
const TITLE = "Sourcing the parts that keep you running.";
const BODY =
  "AFR Enterprises supplies parts to companies that can’t afford downtime. " +
  "When a component is discontinued, back-ordered, or simply hard to track down, " +
  "our team keeps digging until we find it — warrantied, fully traceable, and " +
  "priced to win the bid, backed by a network built over decades in aerospace & defense.";

const CHAR_DELAY = 11; // ms between characters in the darkening sweep

function RevealText({ text, startIndex }) {
  const words = text.split(" ");
  let idx = startIndex;
  const nodes = [];
  words.forEach((word, wi) => {
    const chars = [...word].map((ch) => {
      const d = idx++;
      return (
        <span key={d} className={styles.ch} style={{ transitionDelay: `${d * CHAR_DELAY}ms` }}>
          {ch}
        </span>
      );
    });
    idx++; // count the space so the sweep timing stays continuous
    nodes.push(
      <span key={`w${wi}`} className={styles.word}>
        {chars}
      </span>
    );
    if (wi < words.length - 1) nodes.push(" "); // breakable space between words
  });
  return nodes;
}

export default function OurStory() {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false); // JS + motion allowed → start gray
  const [lit, setLit] = useState(false); // section landed → darken

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = [styles.section, armed && styles.armed, lit && styles.lit]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={cls} aria-labelledby="story-title" ref={ref}>
      <div className="container">
        <p className={styles.eyebrow}>Our story</p>
        <h2 className={styles.title} id="story-title" aria-label={TITLE}>
          <span aria-hidden="true">
            <RevealText text={TITLE} startIndex={0} />
          </span>
        </h2>
        <p className={styles.body} aria-label={BODY}>
          <span aria-hidden="true">
            <RevealText text={BODY} startIndex={TITLE.length + 1} />
          </span>
        </p>
        <div className={styles.foot}>
          <Link className={styles.cta} href="/aboutus/">
            Read our story <span aria-hidden="true">&#8594;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
