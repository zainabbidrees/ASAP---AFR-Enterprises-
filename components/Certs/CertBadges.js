import { CERTS, certSrc } from "./certs";
import styles from "./CertBadges.module.css";

// Reusable accreditation wall. Renders every badge in a tight grid so the whole
// credential set fits a narrow rail — badges keep their ORIGINAL colors (the
// seals are the proof; recoloring them reads as decoration).
//
//   variant "boxed" — grey panel with a heading (inner-page sidebars)
//   variant "bare"  — no panel chrome, for asides that already have their own
//   columns         — grid columns; the CSS clamps down on small screens
export default function CertBadges({
  title = "Certifications & memberships",
  note,
  variant = "boxed",
  columns = 4,
  className = "",
}) {
  return (
    <div
      className={`${styles.wrap} ${variant === "boxed" ? styles.boxed : styles.bare} ${className}`}
      style={{ "--cols": columns }}
    >
      {title && <h3 className={styles.title}>{title}</h3>}

      <ul className={styles.grid}>
        {CERTS.map((c) => (
          <li className={styles.cell} key={c.file}>
            {/* title = hover tooltip, alt = the same name for AT and SEO */}
            <img src={certSrc(c.file)} alt={c.name} title={c.name} loading="lazy" />
          </li>
        ))}
      </ul>

      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}
