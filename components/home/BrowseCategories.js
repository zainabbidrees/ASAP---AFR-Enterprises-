"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./BrowseCategories.module.css";

const TABS = [
  {
    key: "electronic",
    label: "Electronic Components",
    items: [
      { label: "Electromechanical Switches", href: "/part-types/electronics/electromechanical-switches/" },
      { label: "Jumpers", href: "/part-types/electronics/zero-ohm-jumpers/" },
      { label: "Motors and Drives", href: "/part-types/electronics/motors-and-drives/" },
      { label: "Oscillators", href: "/part-types/aviation/oscillator/" },
      { label: "Resistors", href: "/part-types/electronics/resistors/" },
    ],
  },
  {
    key: "aviation",
    label: "Aviation Components",
    items: [
      { label: "Circuit Breaker", href: "/part-types/aviation/circuit-breaker/" },
      { label: "Starter Generator", href: "/part-types/aviation/starter-generator/" },
      { label: "Reading Light", href: "/part-types/aviation/reading-light/" },
      { label: "Gasket", href: "/part-types/aviation/gasket/" },
      { label: "Kit Hose", href: "/part-types/aviation/kit-hose/" },
    ],
  },
  {
    key: "hardware",
    label: "IT Hardware Parts",
    items: [
      { label: "Microprocessors", href: "/part-types/hardware/microprocessors/" },
      { label: "Navigation Systems", href: "/part-types/hardware/navigation/" },
      { label: "Wireless Devices", href: "/part-types/hardware/wireless-devices/" },
      { label: "Graphic Cards", href: "/part-types/hardware/graphic-cards/" },
      { label: "Memory Cards", href: "/part-types/hardware/memory-cards/" },
    ],
  },
];

export default function BrowseCategories() {
  const [active, setActive] = useState("electronic");
  const current = TABS.find((t) => t.key === active);

  return (
    <section className="section" style={{ background: "var(--bg-alt)" }} aria-labelledby="browse-title">
      <div className={`container ${styles.inner}`}>
        <div className="ph-img" data-label="Category image" style={{ minHeight: 260 }} />
        <div className={styles.content}>
          <h2 className="section-title section-title--left" id="browse-title">
            Browse By <strong>Categories</strong>
          </h2>

          <div className={styles.tabs} role="tablist">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`${styles.tab} ${active === t.key ? styles.tabActive : ""}`}
                role="tab"
                aria-selected={active === t.key}
                onClick={() => setActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className={styles.carousel}>
            <button className="carousel-arrow" type="button" aria-label="Previous">&#8249;</button>
            <ul className={styles.list}>
              {current.items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <span className="ph-img" data-label="" style={{ minHeight: 90, marginBottom: 8, display: "block" }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button className="carousel-arrow" type="button" aria-label="Next">&#8250;</button>
          </div>
        </div>
      </div>
    </section>
  );
}
