"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./LeadershipShowcase.module.css";

// Leadership showcase — one featured leader at a time, standing in front of an
// oversized watermark of their own name, with the roster as circular avatars
// underneath and prev/next on either side. Structure follows the reference
// layout; the treatment stays in AFR's monochrome system (grayscale portrait,
// hairline card, no gradients) rather than the reference's blue rounded style.
//
// Every leader's watermark, portrait and card is rendered and stacked in a
// single grid cell, with only the active one visible. That's deliberate: cards
// differ in height because the bios differ in length, so swapping a single
// element would resize the stage and make each change land as a jump. Stacking
// sizes each deck to its tallest member once, so the layout never moves and the
// change is a pure cross-fade.
export default function LeadershipShowcase({ people }) {
  const [index, setIndex] = useState(0);
  const step = (d) => setIndex((n) => (n + d + people.length) % people.length);
  const on = (i) => (i === index ? "true" : undefined);

  return (
    <div className={styles.showcase}>
      <div className={styles.stage}>
        {/* Clipped wrapper: a long name crops at both edges rather than
            widening the page. */}
        <div className={styles.watermarkClip} aria-hidden="true">
          {people.map((p, i) => (
            <span key={p.slug} className={styles.watermark} data-active={on(i)}>
              {p.name}
            </span>
          ))}
        </div>

        <div className={styles.portraitDeck}>
          {people.map((p, i) => (
            <div key={p.slug} className={styles.portrait} data-active={on(i)}>
              <Image
                src={p.photo}
                alt={`${p.name}, ${p.role} at AFR Enterprises`}
                fill
                sizes="(max-width: 700px) 90vw, 520px"
                priority={i === 0}
                className={styles.portraitImg}
              />
            </div>
          ))}
        </div>

        <div className={styles.cardDeck}>
          {people.map((p, i) => (
            <article
              key={p.slug}
              className={styles.card}
              data-active={on(i)}
              aria-hidden={i === index ? undefined : "true"}
            >
              <p className={styles.role}>{p.role}</p>
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.bio}>{p.bio}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => step(-1)}
          aria-label="Previous leader"
        >
          <Arrow dir="left" />
        </button>

        <ul className={styles.roster}>
          {people.map((p, i) => (
            <li key={p.slug}>
              <button
                type="button"
                className={styles.avatar}
                onClick={() => setIndex(i)}
                aria-current={on(i)}
                aria-label={`Show ${p.name}, ${p.role}`}
                data-active={on(i)}
              >
                <Image
                  src={p.photo}
                  alt=""
                  width={72}
                  height={72}
                  className={styles.avatarImg}
                />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.arrow}
          onClick={() => step(1)}
          aria-label="Next leader"
        >
          <Arrow dir="right" />
        </button>
      </div>
    </div>
  );
}

function Arrow({ dir }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
