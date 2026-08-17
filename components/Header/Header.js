"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { useQuoteCart } from "@/components/cart/quoteCart";
import { TOP_MANUFACTURERS, POPULAR_PARTS, PART_TYPES } from "./searchData";

const RECENTS_KEY = "afr_recent_searches";

// Primary navigation model — single source of truth for the menu + dropdowns.
// Fields match the legacy afrenterprises.com header exactly.
const NAV = [
  { label: "Home", href: "/" },
  { label: "Manufacturers", href: "/manufacturer/" },
  { label: "Electronics Parts", href: "/part-types/electronics/" },
  { label: "Aviation Parts", href: "/part-types/aviation/" },
  { label: "Hardware Parts", href: "/part-types/hardware/" },
  {
    label: "NSN Parts",
    href: "#",
    children: [
      { label: "Parts By NIIN", href: "/nsn/niin-parts/" },
      { label: "Parts By FSC", href: "/nsn/fscs/" },
      { label: "Parts By NSN", href: "/nsn/nsn-parts/" },
      { label: "CAGE Code", href: "/nsn/cage-codes/" },
      { label: "Part Types", href: "/nsn/part-types/" },
    ],
  },
  {
    label: "Aircraft Tooling",
    href: "#",
    children: [
      { label: "Aircraft Engine Parts", href: "/aircraft-engine-parts/" },
      { label: "Aircraft Maintenance Tooling", href: "/aircraft-maintenance-tooling/" },
      { label: "Aircraft Engine Baffle", href: "/aircraft-engine-baffle/" },
      { label: "Avionics Test Equipment", href: "/avionics-test-equipment/" },
    ],
  },
  { label: "Blog", href: "/blog/" },
  { label: "Contact Us", href: "/contact/" },
  { label: "About Us", href: "/aboutus/" },
];

export default function Header() {
  const cartLines = useQuoteCart(); // drives the count badge on the cart button
  const [navOpen, setNavOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  // Solid header everywhere — it sits as its own bar above the hero image
  // (no longer floats over it).
  const overlay = false;

  // ---- Smart hide-on-scroll-down / reveal-on-scroll-up ---------------------
  const [scrolled, setScrolled] = useState(false); // past the top → solid style
  const [hidden, setHidden] = useState(false); // slid up out of view

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y < 80) {
        setHidden(false); // always visible near the top
      } else if (y > lastY + 4) {
        setHidden(true); // scrolling down → hide
      } else if (y < lastY - 4) {
        setHidden(false); // scrolling up → reveal
      }
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- Functional search ---------------------------------------------------
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [recents, setRecents] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    try {
      setRecents(JSON.parse(localStorage.getItem(RECENTS_KEY) || "[]"));
    } catch {}
  }, []);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  function saveRecent(term) {
    const t = (term || "").trim();
    if (!t) return;
    const next = [t, ...recents.filter((r) => r.toLowerCase() !== t.toLowerCase())].slice(0, 6);
    setRecents(next);
    try {
      localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
    } catch {}
  }

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return null;
    const byAlpha = (a, b) => a.localeCompare(b);
    return {
      parts: POPULAR_PARTS.filter(
        (p) => p.part.toLowerCase().includes(q) || p.mfr.toLowerCase().includes(q)
      )
        .sort((a, b) => byAlpha(a.part, b.part))
        .slice(0, 6),
      mfrs: TOP_MANUFACTURERS.filter((m) => m.name.toLowerCase().includes(q))
        .sort((a, b) => byAlpha(a.name, b.name))
        .slice(0, 6),
      types: PART_TYPES.filter((t) => t.name.toLowerCase().includes(q))
        .sort((a, b) => byAlpha(a.name, b.name))
        .slice(0, 6),
    };
  }, [q]);

  const hasResults = results && (results.parts.length || results.mfrs.length || results.types.length);

  function closeSearch() {
    setSearchOpen(false);
  }

  return (
    <header
      className={[
        styles.header,
        overlay ? styles.overlay : "",
        scrolled ? styles.scrolled : "",
        hidden ? styles.hidden : "",
      ].join(" ")}
    >
      {/* Logo + global search */}
      <div className={styles.headerMain}>
        <div className={`container ${styles.headerMainInner}`}>
          <Link className={styles.logo} href="/" aria-label="AFR Enterprises home">
            <span className={styles.logoText}>
              <strong className={styles.logoName}>
                AFR <em>ENTERPRISES</em>
              </strong>
              <small className={styles.logoSub}>
                AN <b>ASAP</b> SEMICONDUCTOR WEBSITE
              </small>
            </span>
          </Link>

          <div className={styles.searchWrap} ref={searchRef}>
            <form
              className={styles.search}
              action="/partno-search"
              method="get"
              role="search"
              autoComplete="off"
              onSubmit={() => saveRecent(query)}
            >
              <input
                className={styles.searchField}
                type="text"
                name="searchkey"
                placeholder="Enter part number, manufacturer, part type ..."
                aria-label="Search parts"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
              />
              <button className={styles.searchBtn} type="submit">Search</button>
            </form>

            {searchOpen && (
              <div className={styles.searchPanel}>
                {q ? (
                  hasResults ? (
                    <>
                      {results.parts.length > 0 && (
                        <div className={styles.searchSection}>
                          <p className={styles.searchSectionTitle}>Parts</p>
                          {results.parts.map((p) => (
                            <Link
                              key={p.part}
                              href={p.href}
                              className={styles.sugItem}
                              onClick={() => {
                                saveRecent(p.part);
                                closeSearch();
                              }}
                            >
                              <span className={styles.sugMain}>{p.part}</span>
                              <span className={styles.sugMeta}>{p.mfr}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                      {results.mfrs.length > 0 && (
                        <div className={styles.searchSection}>
                          <p className={styles.searchSectionTitle}>Manufacturers</p>
                          {results.mfrs.map((m) => (
                            <Link
                              key={m.name}
                              href={m.href}
                              className={styles.sugItem}
                              onClick={() => {
                                saveRecent(m.name);
                                closeSearch();
                              }}
                            >
                              <span className={styles.sugMain}>{m.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                      {results.types.length > 0 && (
                        <div className={styles.searchSection}>
                          <p className={styles.searchSectionTitle}>Part types</p>
                          {results.types.map((t) => (
                            <Link
                              key={t.name}
                              href={t.href}
                              className={styles.sugItem}
                              onClick={() => {
                                saveRecent(t.name);
                                closeSearch();
                              }}
                            >
                              <span className={styles.sugMain}>{t.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className={styles.searchEmpty}>
                      No matches yet. Press Enter to search &ldquo;{query.trim()}&rdquo;.
                    </p>
                  )
                ) : (
                  <>
                    {recents.length > 0 && (
                      <div className={styles.searchSection}>
                        <p className={styles.searchSectionTitle}>Recent searches</p>
                        {recents.map((r) => (
                          <a
                            key={r}
                            href={`/partno-search?searchkey=${encodeURIComponent(r)}`}
                            className={styles.sugItem}
                            onClick={closeSearch}
                          >
                            <span className={styles.sugMain}>{r}</span>
                          </a>
                        ))}
                      </div>
                    )}
                    <div className={styles.searchSection}>
                      <p className={styles.searchSectionTitle}>Popular parts</p>
                      {POPULAR_PARTS.slice(0, 5).map((p) => (
                        <Link
                          key={p.part}
                          href={p.href}
                          className={styles.sugItem}
                          onClick={() => {
                            saveRecent(p.part);
                            closeSearch();
                          }}
                        >
                          <span className={styles.sugMain}>{p.part}</span>
                          <span className={styles.sugMeta}>{p.mfr}</span>
                        </Link>
                      ))}
                    </div>
                    <div className={styles.searchSection}>
                      <p className={styles.searchSectionTitle}>Top manufacturers</p>
                      {TOP_MANUFACTURERS.slice(0, 6).map((m) => (
                        <Link
                          key={m.name}
                          href={m.href}
                          className={styles.sugItem}
                          onClick={() => {
                            saveRecent(m.name);
                            closeSearch();
                          }}
                        >
                          <span className={styles.sugMain}>{m.name}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <a
              className={`${styles.hdrBtn} ${styles.aogBtn}`}
              href="tel:1-714-705-4780"
              aria-label="AOG hotline, available 24/7"
            >
              <span className={styles.aogDot} aria-hidden="true" />
              AOG 24/7
            </a>
            <Link
              className={`${styles.hdrBtn} ${styles.cartBtn}`}
              href="/cart/"
              aria-label={
                cartLines.length
                  ? `Quote cart, ${cartLines.length} ${cartLines.length === 1 ? "line" : "lines"}`
                  : "Quote cart, empty"
              }
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
                <path d="M2.5 3h2.2l2.3 11.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 6.5H6" />
              </svg>
              {cartLines.length > 0 && (
                <span className={styles.cartCount} aria-hidden="true">
                  {cartLines.length}
                </span>
              )}
            </Link>
            <Link className={`${styles.hdrBtn} ${styles.rfqBtn}`} href="/straightrfq/">
              Request a Quote
            </Link>
          </div>

          <button
            className={styles.navToggle}
            type="button"
            aria-expanded={navOpen}
            aria-controls="primary-nav"
            aria-label="Toggle menu"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Primary navigation */}
      <nav className={styles.mainNav} aria-label="Primary">
        <div className="container">
          <ul className={`${styles.navList} ${navOpen ? styles.navListOpen : ""}`} id="primary-nav">
            {NAV.map((item) => {
              if (!item.children) {
                return (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                );
              }
              const isOpen = openDropdown === item.label;
              return (
                <li
                  key={item.label}
                  className={`${styles.hasDropdown} ${isOpen ? styles.dropdownOpen : ""}`}
                >
                  <a
                    href="#"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDropdown(isOpen ? null : item.label);
                    }}
                  >
                    {item.label} <span className={styles.caret} aria-hidden="true" />
                  </a>
                  <ul className={styles.dropdown}>
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <Link href={c.href}>{c.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
