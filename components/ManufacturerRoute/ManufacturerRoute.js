import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import CatalogListing from "@/components/CatalogListing/CatalogListing";
import PageProse from "@/components/PageProse/PageProse";
import { SECTIONS } from "@/data/manufacturers";
import { manufacturerParts, pageCount, slugify, titleize } from "@/lib/catalog";
import { CTA, manufacturerIntro } from "@/lib/copy";
import styles from "@/components/CategoryRoute/CategoryRoute.module.css";

// /manufacturer/{slug}/ serves two shapes, exactly as the legacy site does:
//   page-{letter}  → the "View All" letter index from the A–Z directory
//   anything else  → manufacturer detail with its parts table (§4.5)
const LETTER_RE = /^page-([0-9a-z]|0-9)$/;

export function isLetterPage(slug) {
  return LETTER_RE.test(slug);
}

export function manufacturerParams() {
  const slugs = SECTIONS.flatMap((s) => s.mfrs.map(([, href]) => href.split("/").filter(Boolean).pop()));
  const letters = SECTIONS.map((s) => s.viewAll.split("/").filter(Boolean).pop());
  return [...new Set([...slugs, ...letters])].map((slug) => ({ slug }));
}

export function manufacturerMetadata(slug, page) {
  if (isLetterPage(slug)) {
    const letter = slug.replace("page-", "").toUpperCase();
    return {
      title: `Parts Manufacturers Starting With ${letter} | AFR Enterprises`,
      description: `Every aviation, electronic and IT hardware manufacturer in our directory beginning with ${letter}. Browse part numbers and submit an instant RFQ.`,
    };
  }
  const name = titleize(slug);
  const suffix = page > 1 ? ` | Page ${page}` : "";
  return {
    title: `${name} Parts & Part Numbers${suffix} | AFR Enterprises`,
    description: `Browse ${name} part numbers stocked and sourced by AFR Enterprises. AS9120B certified distributor with full traceability. Quotes back in 15 minutes.`,
  };
}

export default function ManufacturerRoute({ slug, page = 1 }) {
  if (isLetterPage(slug)) return <LetterIndex slug={slug} />;

  const name = titleize(slug);
  const total = pageCount(`mfr:${slug}`, 2, 40);
  const rows = manufacturerParts(`${slug}:${page}`, 60);

  // Product types this manufacturer supports — derived from its own rows so the
  // list and the table can never contradict each other.
  const types = [...new Set(rows.map((r) => r.type))].filter((t) => t !== "NA").slice(0, 8);

  return (
    <CatalogListing
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Manufacturers", href: "/manufacturer/" },
        page > 1 ? { label: name, href: `/manufacturer/${slug}/` } : { label: name },
        ...(page > 1 ? [{ label: `Page ${page}` }] : []),
      ]}
      h1={`${name} Parts Catalog`}
      intro={manufacturerIntro(slug)}
      proseEyebrow={`About ${name}`}
      linkList={
        types.length > 0
          ? {
              title: "Supported Product Types",
              items: types.map((t) => [t, `/partno-search/?searchby=parttype&searchkey=${encodeURIComponent(t)}`]),
            }
          : undefined
      }
      tableTitle="Frequently Requested Part Numbers"
      columns={[
        { key: "part", header: "Part No.", kind: "part" },
        { key: "type", header: "Part Type" },
        { key: "desc", header: "Part Description" },
        { key: "qty", header: "QTY" },
        { key: "rfq", header: "RFQ / Cart", kind: "rfq" },
      ]}
      rows={rows}
      pager={{
        displaying: `Displaying Page: ${page} of ${total}`,
        base: `/manufacturer/${slug}/page-`,
        total,
        current: page,
      }}
      cta={CTA}
    />
  );
}

function LetterIndex({ slug }) {
  const letter = slug.replace("page-", "");
  const label = letter === "0-9" ? "0-9" : letter.toUpperCase();
  const section = SECTIONS.find((s) => s.viewAll.endsWith(`/${slug}/`));
  const items = section?.mfrs || [];

  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">Manufacturers Beginning With {label}</h1>

            {items.length > 0 ? (
              <ul className={styles.catGrid}>
                {items.map(([name, href]) => (
                  <li key={href}><Link href={href}>{name}</Link></li>
                ))}
              </ul>
            ) : (
              <p className={styles.intro}>
                Nothing listed under {label} yet.{" "}
                <Link href="/manufacturer/">Browse the full A-Z directory</Link> instead.
              </p>
            )}

            <div className={styles.letterNav}>
              {SECTIONS.map((s) => (
                <Link
                  key={s.viewAll}
                  href={s.viewAll}
                  className={s.viewAll.endsWith(`/${slug}/`) ? styles.letterActive : styles.letterLink}
                >
                  {s.letter}
                </Link>
              ))}
            </div>

            <PageProse
              eyebrow={`Manufacturers · ${label}`}
              lead={[
                `Every manufacturer in our directory listed under ${label}. Open any name above for the part numbers we hold against it, with description and quantity on each line.`,
                `We are AS9120B and ISO 9001:2015 certified, FAA AC 00-56B accredited and AS6081 certified for counterfeit avoidance, so every line is traceable to an approved source.`,
              ]}
              cta={CTA}
            />
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}

export { slugify };
