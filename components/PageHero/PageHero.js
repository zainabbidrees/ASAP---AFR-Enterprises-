import Image from "next/image";
import Link from "next/link";
import styles from "./PageHero.module.css";

// PageHero — the shared opener for interior pages (About, Contact).
// Built like the homepage <Hero />: an inset panel with rounded corners, a real
// photograph behind it, a soft dark scrim over that, and the type on top. Kept
// short (the height is padding-driven, not min-height) so it still reads as an
// inner-page header rather than a second homepage hero. Anatomy mirrors
// <FinalCta /> (pill → two-line title → lede → actions) so every page opens and
// closes the same way.
//
// Props:
//   eyebrow  — short label for the outlined pill
//   title    — JSX, written to break across exactly two lines with a <br />;
//              wrap de-emphasised words in <em> (rendered faint, upright)
//   lede     — one short paragraph
//   actions  — [{ label, href, variant: "primary" | "ghost", tel }]
//   image    — background photograph; omit for the plain dark band
//   imageAlt — decorative by default (the <h1> carries the meaning), so pass
//              this only when the photo says something the copy doesn't
//   imagePos — object-position for the wide crop, e.g. "50% 40%"
export default function PageHero({
  eyebrow,
  title,
  lede,
  actions = [],
  image,
  imageAlt = "",
  imagePos = "50% 50%",
}) {
  return (
    <header className={`${styles.hero} ${image ? styles.hasImage : ""}`}>
      {image && (
        <>
          <Image
            className={styles.bg}
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: imagePos }}
          />
          <div className={styles.scrim} aria-hidden="true" />
        </>
      )}

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
