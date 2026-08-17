import { CERTS, certSrc } from "@/components/Certs/certs";
import styles from "./CertStrip.module.css";

// Certifications & memberships — real badge images (user supplied), shown as a
// grid of cards. Accreditation is gatekeeping in this industry, so the wall of
// seals does the talking. The grid is a 3-row window that rolls upward to reveal
// the next row of badges (pure CSS; loops seamlessly via a duplicated set).
// Badge list comes from components/Certs/certs.js so the homepage and the inner
// page rails can never drift apart.
const COLS = 4;
const ROWS = [];
for (let i = 0; i < CERTS.length; i += COLS) ROWS.push(CERTS.slice(i, i + COLS));

export default function CertStrip() {
  // Duplicate the rows so the upward roll can loop with no visible seam.
  const loopRows = [...ROWS, ...ROWS];

  return (
    <section className={`section ${styles.section}`} aria-labelledby="cert-title">
      <div className="container">
        <header className={styles.head}>
          <h2 className={styles.title} id="cert-title">Certifications &amp; memberships</h2>
          <p className={styles.lead}>
            Fully accredited, regularly audited, and cleared for export. Every order ships with the
            paperwork to back it up.
          </p>
        </header>

        <div className={styles.viewport}>
          <div className={styles.track}>
            {loopRows.map((row, ri) => (
              <div
                className={styles.row}
                key={ri}
                aria-hidden={ri >= ROWS.length ? "true" : undefined}
              >
                {row.map((c) => (
                  <div className={styles.cell} key={c.file}>
                    <img src={certSrc(c.file)} alt={c.name} title={c.name} loading="lazy" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
