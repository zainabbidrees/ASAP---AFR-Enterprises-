import Link from "next/link";
import PageProse from "@/components/PageProse/PageProse";
import FeaturedCategories from "@/components/CatalogExplorer/FeaturedCategories";
import CatalogExplorer from "@/components/CatalogExplorer/CatalogExplorer";
import styles from "./PartTypeLanding.module.css";

// Reusable part-type landing template (Electronics / Aviation / Hardware).
// Full-width editorial layout: header -> "Most requested" bento -> the
// browse-by-letter explorer -> the shared supporting-copy block.
// Props:
//   breadcrumbLabel  – e.g. "Electronics Parts" (used as eyebrow + PageProse eyebrow)
//   h1              – page title
//   intro           – { before, linkText, linkHref, after } (renders an inline link)
//   whyTitle, why[] – "Why Partner" heading + [{title, body}] items
//   howTitle, how[] – "How to Source" heading + [{title, body}] steps
//   requestTitle, requestBody – closing CTA block
//   sections[]      – [{ letter, id, viewAll, items: [[name, href], ...] }]
//   featured[]      – [{ name, tag, href, img }] for the "Most requested" band
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
  featured = [],
}) {
  const total = sections.reduce((n, s) => n + s.items.length, 0);

  return (
    <section className="section">
      <div className="container">
        <header className={styles.head}>
          <p className={styles.eyebrow}>{breadcrumbLabel}</p>
          <h1 className={styles.title}>{h1}</h1>
          <p className={styles.meta}>{total.toLocaleString()} categories to browse or filter.</p>
        </header>

        <FeaturedCategories items={featured} />

        <CatalogExplorer sections={sections} />

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
    </section>
  );
}
