import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import styles from "./NsnDigitCatalog.module.css";

// Reusable NSN "browse by leading digit" catalog template.
// Serves Parts By NIIN and Parts By NSN (both group entries under digit headers).
// Props:
//   breadcrumb   – IGNORED (breadcrumb bar removed sitewide; trail still passed
//                  so it can be reinstated in one place if wanted back)
//   h1
//   intro        – array of strings and { text, href } link objects (inline links)
//   blocks       – [{ title, items: [...] }]  (definition / applications / why blocks)
//   quickTitle, quickBody
//   digits       – [{ digit, href }]  top index (href null = disabled)
//   viewAllHref  – top "View All" button target
//   sections     – [{ digit, id, viewAll, entries: [[primary, href, secondary?], ...] }]
//   entryLabel   – accessible noun for an entry (e.g. "NIIN"), used in headings

export default function NsnDigitCatalog({
  breadcrumb = [],
  h1,
  intro = [],
  blocks = [],
  quickTitle,
  quickBody,
  digits = [],
  viewAllHref,
  sections = [],
  entryLabel = "NIIN",
  cols = 2,
}) {
  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">{h1}</h1>

            <p className={styles.intro}>
              {intro.map((part, i) =>
                typeof part === "string" ? (
                  <span key={i}>{part}</span>
                ) : (
                  <Link key={i} href={part.href}>{part.text}</Link>
                )
              )}
            </p>

            {blocks.map((b) => (
              <div key={b.title}>
                <h2 className={styles.blockTitle}>{b.title}</h2>
                <ul className={styles.bullets}>
                  {b.items.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              </div>
            ))}

            {quickTitle && (
              <>
                <h2 className={styles.blockTitle}>{quickTitle}</h2>
                <p className={styles.intro}>{quickBody}</p>
              </>
            )}

            {/* Digit index */}
            <div className={styles.digitIndex}>
              {digits.map((d) => (
                d.href
                  ? <Link key={d.digit} href={d.href} className={styles.digit}>{d.digit}</Link>
                  : <span key={d.digit} className={`${styles.digit} ${styles.digitDisabled}`}>{d.digit}</span>
              ))}
              {viewAllHref && <Link href={viewAllHref} className={styles.digitViewAll}>View All</Link>}
            </div>

            {/* Digit sections */}
            <div className={styles.sections}>
              {sections.map((sec) => (
                <section className={styles.digitSection} id={sec.id} key={sec.digit}>
                  <div className={styles.sectionHead}>
                    <span className={styles.sectionTitle}>{entryLabel} Start by {sec.digit}</span>
                  </div>
                  <ul className={`${styles.entryGrid} ${cols === 3 ? styles.cols3 : styles.cols2}`}>
                    {sec.entries.map(([primary, href, secondary]) => {
                      const sub = secondary || href.replace(/\/+$/, "").split("/").pop();
                      return (
                        <li key={href}>
                          <Link href={href}>
                            <span className={styles.entryPrimary}>{primary}</span>
                            <span className={styles.entrySecondary}>({sub})</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {sec.viewAll && (
                    <div className={styles.sectionFoot}>
                      <Link className={styles.viewAllBtn} href={sec.viewAll}>View All</Link>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}
