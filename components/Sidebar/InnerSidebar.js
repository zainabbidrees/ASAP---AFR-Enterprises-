"use client";

import { useState } from "react";
import Link from "next/link";
import CertBadges from "@/components/Certs/CertBadges";
import styles from "./InnerSidebar.module.css";

// The right-hand rail shared across inner pages (manufacturer, category listing,
// RFQ, search, etc.): an Instant RFQ widget + a Browse By Categories accordion +
// the full accreditation wall (<CertBadges />, single source of truth).

const BROWSE = [
  {
    group: "Electronic Components",
    items: [
      ["Electronics Parts", "/part-types/electronics/"],
      ["Zero Ohm Jumpers", "/part-types/electronics/zero-ohm-jumpers/"],
      ["Electromechanical Switches", "/part-types/electronics/electromechanical-switches/"],
      ["Relays", "/part-types/electronics/relays/"],
      ["Capacitors", "/part-types/electronics/capacitors/"],
      ["Relay Accessories", "/part-types/electronics/relay-accessories/"],
      ["Semiconductor Modules", "/part-types/electronics/semiconductor-modules/"],
      ["Resistor", "/part-types/electronics/resistors/"],
      ["Wire Wound Resistor", "/part-types/electronics/wire-wound-resistor/"],
      ["Electromechanical Relays", "/part-types/electronics/electromechanical-relays/"],
    ],
  },
  {
    group: "Aviation Components",
    items: [
      ["Circuit Breaker", "/part-types/aviation/circuit-breaker/"],
      ["Reading Light", "/part-types/aviation/reading-light/"],
      ["Starter Generator", "/part-types/aviation/starter-generator/"],
      ["Aircraft Battery Parts", "/part-types/aviation/battery/"],
      ["Pressure Switch", "/part-types/aviation/pressure-switch/"],
      ["Transmitter", "/part-types/aviation/transmitte/"],
      ["Kit Hose", "/part-types/aviation/kit-hose/"],
      ["Gage Fuel", "/part-types/aviation/gage-fuel/"],
      ["Bulkhead Unit", "/part-types/aviation/bulkhead-unit/"],
      ["Sensor Temperature", "/part-types/aviation/sensor-temperature/"],
    ],
  },
  {
    group: "IT Hardware Parts",
    items: [
      ["Microprocessors", "/part-types/hardware/microprocessors/"],
      ["Analog Modems", "/part-types/hardware/analog-modems/"],
      ["Barebone Systems", "/part-types/hardware/barebone-systems/"],
      ["Antennas", "/part-types/hardware/antennas/"],
      ["Ram Modules", "/part-types/hardware/ram-modules/"],
      ["Memory Cards", "/part-types/hardware/memory-cards/"],
      ["Lens Adapters", "/part-types/hardware/lens-adapters/"],
      ["Chargers", "/part-types/hardware/chargers/"],
      ["Wireless Microphone Systems", "/part-types/hardware/wireless-microphone-systems/"],
      ["Cache Memory", "/part-types/hardware/cache-memory/"],
    ],
  },
];

export default function InnerSidebar({ showBrowse = true }) {
  const [openGroup, setOpenGroup] = useState("Electronic Components");

  return (
    <aside className={styles.sidebar}>
      {/* Send Instant RFQ */}
      <div className={styles.rfqBox}>
        <h3 className={styles.boxHead}>Send Instant RFQ</h3>
        {/* GET, not POST: a page route can't read a POST body, so the part number
            would have been dropped. As a query it prefills the full RFQ form. */}
        <form className={styles.rfqForm} action="/straightrfq/" method="get">
          <input type="text" name="partNumber" placeholder="Enter Part Number" aria-label="Enter Part Number" required />
          <input type="text" name="quantity" placeholder="Quantity" aria-label="Quantity" />
          <input type="email" name="email" placeholder="Email Address" aria-label="Email Address" />
          <button className="btn" type="submit">Get A Quote</button>
        </form>
      </div>

      {/* Browse By Categories accordion */}
      {showBrowse && (
      <div className={styles.browseBox}>
        <h3 className={styles.boxHead}>BROWSE BY CATEGORIES</h3>
        {BROWSE.map((g) => {
          const isOpen = openGroup === g.group;
          return (
            <div className={styles.accordion} key={g.group}>
              <button
                className={styles.accHead}
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenGroup(isOpen ? null : g.group)}
              >
                {g.group} <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <ul className={styles.accList}>
                  {g.items.map(([label, href]) => (
                    <li key={href}><Link href={href}>{label}</Link></li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      )}

      {/* Certifications / trust block — real badges, hover for the full name */}
      <CertBadges
        title="Certifications & memberships"
        note="Audited quality systems, export-cleared and fully traceable. Certificate copies ship with every order."
      />
    </aside>
  );
}
