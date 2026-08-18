import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import PageProse from "@/components/PageProse/PageProse";
import styles from "./PartTypeLanding.module.css";

// Reusable part-type landing template (Electronics / Aviation / Hardware).
// Props:
//   breadcrumbLabel  – e.g. "Electronics Parts"
//   h1              – page title
//   intro           – { before, linkText, linkHref, after } (renders an inline link)
//   whyTitle, why[] – "Why Partner" heading + [{title, body}] items
//   howTitle, how[] – "How to Source" heading + [{title, body}] steps
//   requestTitle, requestBody – closing CTA block
//   sections[]      – [{ letter, id, viewAll, items: [[name, href], ...] }]

const RANGES = [
  { label: "0 - 9", letters: ["0-9"] },
  { label: "A - E", letters: ["A", "B", "C", "D", "E"] },
  { label: "F - J", letters: ["F", "G", "H", "I", "J"] },
  { label: "K - O", letters: ["K", "L", "M", "N", "O"] },
  { label: "P - T", letters: ["P", "Q", "R", "S", "T"] },
  { label: "U - Z", letters: ["U", "V", "W", "X", "Y", "Z"] },
];

export default function PartTypeLanding({
  breadcrumbLabel,
  h1,
  intro,
  whyTitle,
  why = [],
  howTitle,
  how = [],
  requestTitle,
  requestBody,
  sections = [],
}) {
  // Map each range to the first section that exists within it (for the quick-jump nav).
  const rangeTargets = RANGES.map((r) => {
    const sec = sections.find((s) => r.letters.includes(s.letter));
    return { label: r.label, target: sec ? `#${sec.id}` : null };
  });

  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">{h1}</h1>

            {/* Letter quick-jump */}
            <ul className={styles.ranges}>
              {rangeTargets.map((r) => (
                <li key={r.label}>
                  {r.target ? <a href={r.target}>{r.label}</a> : <span className={styles.rangeDisabled}>{r.label}</span>}
                </li>
              ))}
              {sections[0]?.viewAll && (
                <li><Link className={styles.viewAllTop} href={sections[0].viewAll}>View All</Link></li>
              )}
            </ul>

            {/* Letter sections of categories */}
            <div className={styles.sections}>
              {sections.map((sec) => (
                <section className={styles.letterSection} id={sec.id} key={sec.letter}>
                  <div className={styles.letterHead}>
                    <span className={styles.letter}>{sec.letter}</span>
                    {sec.viewAll && <Link className={styles.viewAll} href={sec.viewAll}>View All &#8594;</Link>}
                  </div>
                  <ul className={styles.catGrid}>
                    {sec.items.map(([name, href]) => (
                      <li key={href}><Link href={href}>{name}</Link></li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {/* The catalog above is what people came for; the copy explaining it
                follows underneath, designed in one shared block. */}
            <PageProse
              eyebrow={breadcrumbLabel}
              lead={
                <>
                  {intro.before}
                  {intro.linkText && (
                    <>
                      {" "}
                      <Link href={intro.linkHref}>{intro.linkText}</Link>
                    </>
                  )}
                  {/* `after` usually opens with punctuation (". Browse by …"), so a
                      space here would leave the link floating away from it. */}
                  {intro.after && (/^[.,;:!?)]/.test(intro.after) ? intro.after : ` ${intro.after}`)}
                </>
              }
              blocks={[
                { title: whyTitle, items: why },
                { title: howTitle, items: how, numbered: true },
              ]}
              cta={{
                title: requestTitle,
                body: requestBody,
                href: "/straightrfq/",
                label: "Request a Quote",
              }}
            />
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}
