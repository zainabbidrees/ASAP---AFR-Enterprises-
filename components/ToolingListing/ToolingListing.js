import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import PageProse from "@/components/PageProse/PageProse";
import AddToCartButton from "@/components/cart/AddToCartButton";
import styles from "./ToolingListing.module.css";

// Reusable Aircraft-Tooling listing template (Engine Parts / Maintenance Tooling /
// Engine Baffle / Avionics Test Equipment). The listing leads the page — heading,
// pager, parts table — and every word of supporting copy follows underneath in
// PageProse, so these pages read the same way as the rest of the inner pages.
// Props:
//   breadcrumb   – IGNORED (breadcrumb bar removed sitewide; trail still passed
//                  so it can be reinstated in one place if wanted back)
//   h1, intro
//   sections     – [{ title, intro?, bullets: [] }] → prose topics below the table
//   proseEyebrow – kicker on the copy block (default "About these parts")
//   proseTitle   – optional heading on the copy block
//   col2Header   – header label for the 2nd table column ("Engine Number" | "Manufacturer")
//   rows         – [{ part, col2, desc, href }]
//   displaying   – e.g. "Displaying Page: 1 of 247"
//   pageBase     – pagination href base, e.g. "/aircraft-engine-parts/page-"
//   totalPages   – how many numbered links to show (default 10)

export default function ToolingListing({
  breadcrumb = [],
  h1,
  intro,
  sections = [],
  closing,
  proseEyebrow = "About these parts",
  proseTitle,
  col2Header = "Manufacturer",
  rows = [],
  displaying,
  pageBase,
  totalPages = 10,
}) {
  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">{h1}</h1>

            {/* ---- The listing, first ---- */}
            {displaying && <Pager displaying={displaying} pageBase={pageBase} totalPages={totalPages} />}

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Part No.</th>
                    <th>{col2Header}</th>
                    <th>Description</th>
                    <th className={styles.rfqCol}>RFQ / Cart</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={`${r.part}-${i}`}>
                      <td><Link className={styles.partLink} href={r.href}>{r.part}</Link></td>
                      <td className={styles.cap}>{r.col2}</td>
                      <td className={styles.cap}>{r.desc}</td>
                      <td className={styles.rfqCol}>
                        <div className={styles.rowActions}>
                          <Link className={styles.rfqBtn} href={r.href}>RFQ</Link>
                          <AddToCartButton part={r.part} href={r.href} mfr={r.col2} desc={r.desc} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {displaying && <Pager pageBase={pageBase} totalPages={totalPages} bottom />}

            {/* ---- Then the copy ---- */}
            <PageProse
              eyebrow={proseEyebrow}
              title={proseTitle}
              lead={intro}
              blocks={sections}
              closing={closing}
            />
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}

// "Displaying Page: 1 of N" + numbered links, matching the legacy pager. Page 1 is
// always the live page here — the listing data is a fixed shell.
function Pager({ displaying, pageBase, totalPages = 10, bottom = false }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`${styles.pager} ${bottom ? styles.pagerBottom : ""}`}>
      {!bottom && <span className={styles.displaying}>{displaying}</span>}
      <div className={styles.pages}>
        <span className={styles.pageArrow} aria-hidden="true">&laquo;</span>
        <span className={`${styles.page} ${styles.pageActive}`} aria-current="page">1</span>
        {pages.slice(1).map((p) => (
          <Link key={p} href={`${pageBase}${p}/`} className={styles.page}>{p}</Link>
        ))}
        <Link href={`${pageBase}2/`} className={styles.pageArrow} aria-label="Next">&raquo;</Link>
      </div>
    </div>
  );
}
