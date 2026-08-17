import Link from "next/link";
import styles from "./PageHero.module.css";

// PageHero — the shared opener for interior pages (About, Contact).
// Deliberately image-free and short: a dark band that reads as an inner-page
// header rather than a homepage hero. Anatomy mirrors <FinalCta /> (pill →
// two-line title → lede → actions) so every page opens and closes the same way.
//
// Props:
//   eyebrow  — short label for the outlined pill
//   title    — JSX, written to break across exactly two lines with a <br />;
//              wrap de-emphasised words in <em> (rendered faint, upright)
//   lede     — one short paragraph
//   actions  — [{ label, href, variant: "primary" | "ghost", tel }]
export default function PageHero({ eyebrow, title, lede, actions = [] }) {
  return (
    <header className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

        <h1 className={styles.title}>{title}</h1>

        {lede && <p className={styles.lede}>{lede}</p>}

        {actions.length > 0 && (
          <div className={styles.actions}>
            {actions.map((a) => {
              const cls = a.variant === "ghost" ? styles.ghost : styles.primary;
              return a.tel ? (
                <a className={cls} href={a.href} key={a.href}>
                  {a.label}
                </a>
              ) : (
                <Link className={cls} href={a.href} key={a.href}>
                  {a.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
