import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import CatalogListing from "@/components/CatalogListing/CatalogListing";
import { SECTIONS } from "@/data/nsn-part-types";
import { nsnParts, pageCount, slugify, titleize } from "@/lib/catalog";
import { CTA } from "@/lib/copy";
import styles from "@/components/CategoryRoute/CategoryRoute.module.css";

// /nsn/part-types/{name}/ — the NSN-flavoured category leaf. Same two shapes as
// the other A–Z sections: a page-{letter} index, or a part-type parts table.
const LETTER_RE = /^page-([0-9a-z]|0-9)$/;

export function isLetterPage(slug) {
  return LETTER_RE.test(slug);
}

export function nsnPartTypeParams() {
  const names = SECTIONS.flatMap((s) => (s.items || s.types || []).map(([, href]) => href.split("/").filter(Boolean).pop()));
  const letters = SECTIONS.map((s) => s.viewAll?.split("/").filter(Boolean).pop()).filter(Boolean);
  return [...new Set([...names, ...letters])].map((name) => ({ name }));
}

export function nsnPartTypeMetadata(slug) {
  if (isLetterPage(slug)) {
    const letter = slug.replace("page-", "").toUpperCase();
    return {
      title: `NSN Part Types Starting With ${letter} | AFR Enterprises`,
      description: `Browse NSN-catalogued part types beginning with ${letter}, with National Stock Numbers, approved manufacturers and instant RFQ.`,
    };
  }
  const name = titleize(slug);
  return {
    title: `${name} NSN Parts | National Stock Numbers | AFR Enterprises`,
    description: `${name} parts with their National Stock Numbers, item names and approved manufacturers. AS9120B certified, CAGE code 6RE77. Instant RFQ.`,
  };
}

export default function NsnPartTypeRoute({ slug }) {
  if (isLetterPage(slug)) return <LetterIndex slug={slug} />;

  const name = titleize(slug);
  const rows = nsnParts(`parttype:${slug}`, 45);
  const total = pageCount(`nsnpt:${slug}`, 2, 60);
  const mfrs = [...new Set(rows.map((r) => r.mfr))].slice(0, 8);

  return (
    <CatalogListing
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "NSN Parts", href: "/nsn/nsn-parts/" },
        { label: "Part Types", href: "/nsn/part-types/" },
        { label: name },
      ]}
      h1={`${name} NSN Parts Catalog`}
      intro={`Every ${name.toLowerCase()} line we hold against a National Stock Number, with the approved manufacturer and item name for each. AFR Enterprises supplies NSN-catalogued hardware to defense primes, government agencies and MRO facilities under CAGE code 6RE77, with full traceability on every shipment.`}
      linkList={{
        title: `${name} Manufacturers List`,
        items: mfrs.map((m) => [m, `/nsn/manufacturer/${slugify(m)}/`]),
      }}
      tableTitle={`${name} Part Numbers List`}
      columns={[
        { key: "part", header: "Part No.", kind: "part" },
        { key: "nsn", header: "NSN", kind: "link", hrefKey: "nsnHref" },
        { key: "item", header: "Item Name" },
        { key: "mfr", header: "Manufacturer", kind: "link", hrefKey: "mfrHref" },
        { key: "qty", header: "QTY" },
        { key: "rfq", header: "RFQ / Cart", kind: "rfq" },
      ]}
      rows={rows.map((r) => ({
        ...r,
        nsnHref: `/nsn/nsn-parts/${r.nsnFlat}/`,
        mfrHref: `/nsn/manufacturer/${slugify(r.mfr)}/`,
      }))}
      pager={{
        displaying: `Displaying Page: 1 of ${total}`,
        base: `/nsn/part-types/${slug}/page-`,
        total,
      }}
      cta={CTA}
    />
  );
}

function LetterIndex({ slug }) {
  const letter = slug.replace("page-", "");
  const label = letter === "0-9" ? "0 – 9" : letter.toUpperCase();
  const section = SECTIONS.find((s) => s.viewAll?.endsWith(`/${slug}/`));
  const items = section?.items || section?.types || [];

  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">NSN Part Types Beginning With {label}</h1>
            <p className={styles.intro}>
              NSN-catalogued part types listed under {label}. Open any type for its National Stock
              Numbers and approved manufacturers.
            </p>

            {items.length > 0 ? (
              <ul className={styles.catGrid}>
                {items.map(([name, href]) => (
                  <li key={href}><Link href={href}>{titleize(slugify(name))}</Link></li>
                ))}
              </ul>
            ) : (
              <p className={styles.intro}>
                Nothing catalogued under {label} yet.{" "}
                <Link href="/nsn/part-types/">Browse the full part-type index</Link> instead.
              </p>
            )}

            <div className={styles.letterNav}>
              {SECTIONS.filter((s) => s.viewAll).map((s) => (
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
