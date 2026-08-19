"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./CatalogExplorer.module.css";

const FULL = ["0-9", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

// Browse-by-letter explorer over the category index.
//
// The full A–Z listing is always rendered (good for scanning and for SEO). A
// sticky alphabet rail jumps to any letter's section; a live keyword filter
// narrows the list in place. A scroll-spy highlights the letter currently in view.
export default function CatalogExplorer({
  sections = [],
  noun = "categories",
  nounSingular = "category",
  filterExample = "relay",
}) {
  const [query, setQuery] = useState("");
  const [spy, setSpy] = useState(sections[0]?.letter ?? null);

  const byLetter = useMemo(() => {
    const m = new Map();
    sections.forEach((s) => m.set(s.letter, s));
    return m;
  }, [sections]);

  const q = query.trim().toLowerCase();

  // Each letter group, filtered in place (identical to the full list when idle).
  const view = useMemo(
    () =>
      sections.map((s) => {
        const items = q ? s.items.filter(([name]) => name.toLowerCase().includes(q)) : s.items;
        return { letter: s.letter, id: s.id, viewAll: s.viewAll, items, hidden: q ? items.length === 0 : false };
      }),
    [sections, q]
  );
  const visibleSections = useMemo(() => view.filter((s) => !s.hidden), [view]);
  const matchLetters = useMemo(() => new Set(visibleSections.map((s) => s.letter)), [visibleSections]);

  // Scroll-spy: highlight the letter whose section currently sits at the top of
  // the list (just under the sticky rail). rAF-throttled so it stays cheap.
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const offset = 96; // sticky rail + breathing room
      let current = visibleSections[0]?.letter ?? null;
      for (const s of visibleSections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 1) current = s.letter;
        else break;
      }
      setSpy(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [visibleSections]);

  const anyMatch = visibleSections.length > 0;

  return (
    <section className={styles.explorer} aria-label="Browse catalog">
      <div className={styles.filter}>
        <svg className={styles.filterIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.4-3.4" strokeLinecap="round" />
        </svg>
        <input
          className={styles.filterInput}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Filter ${noun} — try “${filterExample}”`}
          aria-label={`Filter ${noun}`}
          autoComplete="off"
        />
        {q && (
          <button className={styles.clear} type="button" onClick={() => setQuery("")}>Clear</button>
        )}
      </div>

      <nav className={styles.rail} aria-label="Jump to letter">
        {FULL.map((L) => {
          const sec = byLetter.get(L);
          const hasMatch = sec && (!q || matchLetters.has(L));
          if (!hasMatch) {
            return <span key={L} className={`${styles.railItem} ${styles.railOff}`} aria-hidden="true">{L}</span>;
          }
          return (
            <a
              key={L}
              href={`#${sec.id}`}
              className={`${styles.railItem} ${spy === L ? styles.railOn : ""}`}
              aria-current={spy === L ? "true" : undefined}
            >
              {L}
            </a>
          );
        })}
      </nav>

      {anyMatch ? (
        <div className={styles.groups}>
          {visibleSections.map((s) => (
            <section key={s.letter} id={s.id} className={styles.group}>
              <div className={styles.gLetter}>
                <h2 className={`${styles.big} ${s.letter.length > 1 ? styles.bigMulti : ""}`}>{s.letter}</h2>
                <span className={styles.count}>
                  {s.items.length} {s.items.length === 1 ? nounSingular : noun}
                </span>
              </div>
              <div className={styles.gBody}>
                {s.viewAll && (
                  <div className={styles.gHead}>
                    <Link className={styles.viewAll} href={s.viewAll}>
                      View all {s.letter} <span aria-hidden="true">&#8594;</span>
                    </Link>
                  </div>
                )}
                <ul className={styles.gList}>
                  {s.items.map(([name, href]) => (
                    <li key={href}>
                      <Link className={styles.cat} href={href}>{name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No {noun} match &ldquo;{query}&rdquo;.</p>
          <p className={styles.emptyBody}>
            Try a shorter or more general term, or{" "}
            <button className={styles.linkBtn} type="button" onClick={() => setQuery("")}>clear the filter</button>.
          </p>
        </div>
      )}
    </section>
  );
}
