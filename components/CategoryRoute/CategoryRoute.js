import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import CatalogListing from "@/components/CatalogListing/CatalogListing";
import { categoryParts, manufacturersFor, pageCount, slugify, titleize } from "@/lib/catalog";
import { CTA, FAMILY, categoryFaq, categoryIntro } from "@/lib/copy";
import styles from "./CategoryRoute.module.css";

// One route serves two shapes under /part-types/{family}/{slug}/:
//   page-{letter}  → the "View All" letter index linked from the family landing
//   anything else  → the category catalog listing (WEBSITE-STUDY.md §4.3)
// They share a URL segment on the legacy site, so they share a route here.
const LETTER_RE = /^page-([0-9a-z]|0-9)$/;

export function isLetterPage(slug) {
  return LETTER_RE.test(slug);
}

/** All slugs this family should prerender: every category plus every letter page. */
export function familyParams(sections) {
  const cats = sections.flatMap((s) => s.items.map(([, href]) => href.split("/").filter(Boolean).pop()));
  const letters = sections.map((s) => s.viewAll.split("/").filter(Boolean).pop());
  return [...new Set([...cats, ...letters])].map((category) => ({ category }));
}

export function categoryMetadata(family, slug, sections) {
  const f = FAMILY[family];
  if (isLetterPage(slug)) {
    const letter = slug.replace("page-", "").toUpperCase();
    return {
      title: `${f.label} Starting With ${letter} | AFR Enterprises`,
      description: `Every ${f.noun} part category we stock beginning with ${letter}. Browse the catalog and submit an instant RFQ.`,
    };
  }
  const name = titleize(slug);
  return {
    title: `${name} Parts | ${f.label} Catalog | AFR Enterprises`,
    description: `Browse AFR Enterprises' complete list of ${name} ${f.noun} part numbers with manufacturers and availability. AS9120B certified. Quotes back in 15 minutes.`,
  };
}

export default function CategoryRoute({ family, slug, sections }) {
  const f = FAMILY[family];

  if (isLetterPage(slug)) {
    return <LetterIndex family={family} slug={slug} sections={sections} />;
  }

  const name = titleize(slug);
  const mfrs = manufacturersFor(`${family}/${slug}`, 7);
  const rows = categoryParts(family, slug, 90);

  // Sibling categories from the same letter group — real links, not invented ones.
  const group = sections.find((s) => s.items.some(([, href]) => href.endsWith(`/${slug}/`)));
  const siblings = (group?.items || [])
    .filter(([, href]) => !href.endsWith(`/${slug}/`))
    .slice(0, 8)
    .map(([label, href]) => [titleize(slugify(label)), href]);

  return (
    <CatalogListing
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: f.label, href: f.href },
        { label: name },
      ]}
      h1={`Our Complete List of ${name} Parts`}
      intro={categoryIntro(family, slug)}
      linkList={{
        title: `${name} Manufacturers List`,
        items: mfrs.map((m) => [m, `/manufacturer/${slugify(m)}/`]),
      }}
      tableTitle={`${name} Part Numbers List`}
      columns={[
        { key: "part", header: "Part No.", kind: "part" },
        { key: "mfr", header: "Manufacturer", kind: "link", hrefKey: "mfrHref" },
        { key: "desc", header: "Part Description" },
        { key: "qty", header: "QTY" },
        { key: "rfq", header: "RFQ / Cart", kind: "rfq" },
      ]}
      rows={rows.map((r) => ({ ...r, mfrHref: `/manufacturer/${slugify(r.mfr)}/` }))}
      pager={{
        displaying: `Displaying Page: 1 of ${pageCount(`${family}/${slug}`, 2, 24)}`,
        base: `${f.href}${slug}/page-`,
        total: Math.min(pageCount(`${family}/${slug}`, 2, 24), 10),
      }}
      related={siblings.length > 0 ? { title: `Related ${f.label}`, items: siblings } : undefined}
      faq={categoryFaq(family, slug)}
      cta={CTA}
    />
  );
}

/* --------------------------------------------------------- letter index page */

// The "View All" target from the family landing page: every category in one
// letter group, in full, with no table.
function LetterIndex({ family, slug, sections }) {
  const f = FAMILY[family];
  const letter = slug.replace("page-", "");
  const label = letter === "0-9" ? "0 – 9" : letter.toUpperCase();
  const section = sections.find((s) => s.viewAll.endsWith(`/${slug}/`));
  const items = section?.items || [];

  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">
              {f.label} Beginning With {label}
            </h1>
            <p className={styles.intro}>
              Every {f.noun} part category we catalog under {label}. Open any category for its full
              part-number list, or send your numbers straight through for a 15-minute quote.
            </p>

            {items.length > 0 ? (
              <ul className={styles.catGrid}>
                {items.map(([name, href]) => (
                  <li key={href}>
                    <Link href={href}>{titleize(slugify(name))}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.intro}>
                Nothing catalogued under {label} yet.{" "}
                <Link href={f.href}>Browse the full {f.label.toLowerCase()} index</Link> instead.
              </p>
            )}

            <div className={styles.letterNav}>
              {sections.map((s) => (
                <Link
                  key={s.viewAll}
                  href={s.viewAll}
                  className={s.viewAll.endsWith(`/${slug}/`) ? styles.letterActive : styles.letterLink}
                >
                  {s.letter}
                </Link>
              ))}
            </div>
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}
