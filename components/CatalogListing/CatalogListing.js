import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import PageProse from "@/components/PageProse/PageProse";
import AddToCartButton from "@/components/cart/AddToCartButton";
import styles from "./CatalogListing.module.css";

// The catalog page shape shared by every table-driven template: category
// listings, manufacturer detail, NSN leaves, FSC classes, CAGE codes.
//
// The order is deliberate and the same on every inner page: the listing people
// came for leads (heading → pager → parts table → any characteristics grid), then
// the supporting copy in PageProse, then the ways onward (link blocks, FAQ, CTA).
// Only the columns and the link lists change between templates.
//
// Props:
//   breadcrumb   – IGNORED. The breadcrumb bar was removed sitewide (a full-width
//                  band for one crumb); callers still pass the trail so it can be
//                  reinstated in one place if it is ever wanted back.
//   h1           – page heading
//   intro        – lead copy, rendered BELOW the listing (string, node, or array)
//   sections     – [{ title, intro?, bullets }] extra copy topics, also below
//   proseEyebrow – kicker on the copy block (default "About this listing")
//   linkList     – { title, items: [[label, href], …], note? } inline link block
//   columns      – [{ key, header, kind?: "part" | "link" | "text" | "rfq", width? }]
//   rows         – row objects; `kind: "part"`/"link" cells use row.href
//   tableTitle   – heading above the table
//   pager        – { displaying, base, total } numbered pagination
//   attrTable    – { title, intro?, head: [..], rows: [[..]] } MIL-STD style grid
//   faq          – { title, items: [{ q, a }] }
//   related      – { title, items: [[label, href], …] }
//   cta          – { title, body, href, label }
export default function CatalogListing({
  breadcrumb = [],
  h1,
  intro,
  sections = [],
  proseEyebrow = "About this listing",
  proseTitle,
  closing,
  linkList,
  columns = [],
  rows = [],
  tableTitle,
  pager,
  attrTable,
  faq,
  related,
  cta,
}) {
  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">{h1}</h1>

            {/* ---- The listing, first ---- */}
            {tableTitle && <h2 className={styles.listingTitle}>{tableTitle}</h2>}

            {pager && <Pager {...pager} />}

            {rows.length > 0 && (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {columns.map((c) => (
                        <th key={c.key} className={c.kind === "rfq" ? styles.rfqCol : undefined}>
                          {c.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={`${row.part || row.nsn || i}-${i}`}>
                        {columns.map((c) => (
                          <Cell key={c.key} col={c} row={row} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {pager && <Pager {...pager} bottom />}

            {/* MIL-STD characteristics / registration grid — data, so it stays with
                the table rather than travelling down with the prose. */}
            {attrTable?.rows?.length > 0 && (
              <div className={styles.block}>
                <h2 className={styles.blockTitle}>{attrTable.title}</h2>
                {attrTable.intro && <p className={styles.blockIntro}>{attrTable.intro}</p>}
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>{attrTable.head.map((h) => <th key={h}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {attrTable.rows.map((r, i) => (
                        <tr key={i}>
                          {r.map((cell, j) => (
                            <td key={j} className={j === 0 ? styles.mono : undefined}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ---- Then the copy ---- */}
            <PageProse
              eyebrow={proseEyebrow}
              title={proseTitle}
              lead={intro}
              blocks={sections}
              closing={closing}
            />

            {/* ---- Then the ways onward ---- */}
            {linkList?.items?.length > 0 && (
              <div className={styles.block}>
                <h2 className={styles.blockTitle}>{linkList.title}</h2>
                {linkList.note && <p className={styles.blockIntro}>{linkList.note}</p>}
                <ul className={styles.linkList}>
                  {linkList.items.map(([label, href]) => (
                    <li key={href}><Link href={href}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            )}

            {related?.items?.length > 0 && (
              <div className={styles.block}>
                <h2 className={styles.blockTitle}>{related.title}</h2>
                <ul className={styles.linkList}>
                  {related.items.map(([label, href]) => (
                    <li key={href}><Link href={href}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            )}

            {faq?.items?.length > 0 && (
              <div className={styles.block}>
                <h2 className={styles.blockTitle}>{faq.title}</h2>
                <dl className={styles.faq}>
                  {faq.items.map((item) => (
                    <div className={styles.faqItem} key={item.q}>
                      <dt>{item.q}</dt>
                      <dd>{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {cta && (
              <div className={styles.cta}>
                <h2 className={styles.ctaTitle}>{cta.title}</h2>
                <p className={styles.ctaBody}>{cta.body}</p>
                <Link className="btn" href={cta.href}>{cta.label}</Link>
              </div>
            )}
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}

function Cell({ col, row }) {
  const value = row[col.key];

  if (col.kind === "rfq") {
    return (
      <td className={styles.rfqCol}>
        <div className={styles.rowActions}>
          <Link className={styles.rfqBtn} href={row.href}>RFQ</Link>
          <AddToCartButton
            part={row.part || row.nsn}
            href={row.href}
            mfr={row.mfr}
            desc={row.desc}
          />
        </div>
      </td>
    );
  }
  if (col.kind === "part") {
    return <td><Link className={styles.partLink} href={row.href}>{value}</Link></td>;
  }
  if (col.kind === "link") {
    const href = row[col.hrefKey];
    return <td>{href ? <Link href={href}>{value}</Link> : <span className={styles.cap}>{value}</span>}</td>;
  }
  return <td className={styles.cap}>{value}</td>;
}

// "Displaying Page: 1 of N" + numbered links, matching the legacy pager.
function Pager({ displaying, base, total = 10, current = 1, bottom = false }) {
  const shown = Math.min(total, 10);
  const pages = Array.from({ length: shown }, (_, i) => i + 1);

  return (
    <div className={`${styles.pager} ${bottom ? styles.pagerBottom : ""}`}>
      {!bottom && <span className={styles.displaying}>{displaying}</span>}
      <div className={styles.pages}>
        {current > 1 && (
          <Link href={`${base}${current - 1}/`} className={styles.pageArrow} aria-label="Previous">&laquo;</Link>
        )}
        {pages.map((p) =>
          p === current ? (
            <span className={`${styles.page} ${styles.pageActive}`} key={p} aria-current="page">{p}</span>
          ) : (
            <Link key={p} href={`${base}${p}/`} className={styles.page}>{p}</Link>
          )
        )}
        {current < total && (
          <Link href={`${base}${current + 1}/`} className={styles.pageArrow} aria-label="Next">&raquo;</Link>
        )}
      </div>
    </div>
  );
}
