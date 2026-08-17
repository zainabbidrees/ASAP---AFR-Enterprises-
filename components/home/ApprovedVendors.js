"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./ApprovedVendors.module.css";

// Approved manufacturers — nor.ma's exact treatment: a fixed number of logo
// slots that fade-swap through the full manufacturer pool. Each slot fades out,
// swaps to the next (not-currently-shown) logo, and fades back in; one slot
// changes at a time on a calm cadence, so the rest of the logos keep "appearing
// in their place." Logos are sized up so our marks stay clearly legible.
const MFRS = [
  ["Boeing", "boeing"],
  ["Honeywell", "honeywell"],
  ["GE Aviation", "ge-aviation"],
  ["Lockheed Martin", "lockheed-martin"],
  ["Parker", "parker"],
  ["Eaton", "eaton"],
  ["Goodrich", "goodrich"],
  ["De Havilland Canada", "de-havilland-aircraft-of-canada"],
  ["Kadon Aerospace", "kadon-aerospace"],
  ["Rexroth", "rexroth"],
  ["Harwin", "harwin"],
  ["Flextronics", "flextronics"],
  ["Freescale", "freescale"],
  ["Everlight", "everlight"],
  ["Elmwood", "elmwood"],
  ["Edison", "edison"],
  ["Jamicon", "jamicon"],
  ["Johnson Bros", "jonsons-bros"],
  ["Ziatech", "ziatech"],
];

const SLOTS = 6; // visible logo slots — fills the full content width
const SWAP_MS = 2000; // gap between individual slot swaps
const FADE_MS = 500; // opacity fade duration (matches the CSS transition)

export default function ApprovedVendors() {
  const [slots, setSlots] = useState(() =>
    Array.from({ length: SLOTS }, (_, i) => i % MFRS.length)
  );
  const [vis, setVis] = useState(() => Array(SLOTS).fill(true));

  const slotsRef = useRef(slots);
  const ptrRef = useRef(SLOTS % MFRS.length); // next logo to bring in
  const tickRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (MFRS.length <= SLOTS) return; // nothing to cycle through

    let fadeTimer;
    const id = setInterval(() => {
      const s = tickRef.current % SLOTS;
      tickRef.current += 1;

      // fade the slot out
      setVis((v) => {
        const n = [...v];
        n[s] = false;
        return n;
      });

      // after it's faded, swap in the next logo not already on screen, fade back
      fadeTimer = setTimeout(() => {
        const shown = new Set(slotsRef.current.filter((_, i) => i !== s));
        let next = ptrRef.current;
        let guard = 0;
        while (shown.has(next) && guard < MFRS.length) {
          next = (next + 1) % MFRS.length;
          guard += 1;
        }
        ptrRef.current = (next + 1) % MFRS.length;
        slotsRef.current = slotsRef.current.map((v, i) => (i === s ? next : v));
        setSlots([...slotsRef.current]);
        setVis((v) => {
          const n = [...v];
          n[s] = true;
          return n;
        });
      }, FADE_MS);
    }, SWAP_MS);

    return () => {
      clearInterval(id);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="avl-title">
      <div className="container">
        <p className={styles.eyebrow}>Approved manufacturers</p>
        <h2 className={styles.title} id="avl-title">
          The manufacturers behind every part we ship.
        </h2>

        <ul className={styles.wall} aria-label="Manufacturer logos">
          {slots.map((logoIdx, s) => {
            const [name, file] = MFRS[logoIdx];
            return (
              <li className={styles.slot} key={s} style={{ opacity: vis[s] ? 1 : 0 }}>
                <img src={`/logos/mfr/${file}.webp`} alt={name} loading="lazy" />
              </li>
            );
          })}
        </ul>

        <div className={styles.foot}>
          <Link className={styles.viewAll} href="/manufacturer/">
            See all manufacturers <span aria-hidden="true">&#8594;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
