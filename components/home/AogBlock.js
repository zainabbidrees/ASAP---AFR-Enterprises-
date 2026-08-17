import styles from "./AogBlock.module.css";

// AOG / urgency block — the single mission-critical moment on the page.
// Reads as an emergency line: dark base, reserved --urgent red accent, live hotline status.
export default function AogBlock() {
  return (
    <section className={styles.block} aria-labelledby="aog-title">
      <div className={styles.radar} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.status}>
            <span className={styles.pulse} aria-hidden="true" />
            AOG desk online · 24/7/365
          </p>
          <h2 className={styles.title} id="aog-title">Grounded and need a part now?</h2>
          <p className={styles.text}>
            When a jet&apos;s on the ground or a line&apos;s stopped, you don&apos;t need a ticket
            number — you need the part. Call the desk and a real responder starts the search the
            moment you hang up.
          </p>
          <ul className={styles.points}>
            <li>Priority handling</li>
            <li>Dedicated responder</li>
            <li>15-minute response</li>
          </ul>
        </div>

        <div className={styles.panel}>
          <p className={styles.panelLabel}>Call the AOG desk</p>
          <a
            className={styles.call}
            href="tel:1-714-705-4780"
            aria-label="Call the AOG hotline at +1 714 705 4780"
          >
            <span className={styles.callIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 4.5h3.2l1.2 4-2 1.3a12 12 0 0 0 5 5l1.3-2 4 1.2v3.2a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 2.5 6.7a2 2 0 0 1 2-2.2Z" />
              </svg>
            </span>
            <span className={styles.callNumber}>+1 (714) 705-4780</span>
          </a>
          <p className={styles.panelFoot}>Guaranteed 15-minute response, any hour.</p>
        </div>
      </div>
    </section>
  );
}
