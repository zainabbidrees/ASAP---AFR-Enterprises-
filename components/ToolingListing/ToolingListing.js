import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import AddToCartButton from "@/components/cart/AddToCartButton";
import styles from "./ToolingListing.module.css";

// Reusable Aircraft-Tooling listing template (Engine Parts / Maintenance Tooling /
// Engine Baffle / Avionics Test Equipment). A paginated parts table whose second
// column varies (Engine Number vs Manufacturer), plus intro + info sections.
// Props:
//   breadcrumb   – IGNORED (breadcrumb bar removed sitewide; trail still passed
//                  so it can be reinstated in one place if wanted back)
//   h1, intro
//   sections     – [{ title, intro?, bullets: [] }]
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
  col2Header = "Manufacturer",
  rows = [],
  displaying,
  pageBase,
  totalPages = 10,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">{h1}</h1>
            {intro && <p className={styles.intro}>{intro}</p>}

            {sections.map((s, i) => (
              <div key={s.title || i}>
                {s.title && <h2 className={styles.blockTitle}>{s.title}</h2>}
                {s.intro && <p className={styles.intro}>{s.intro}</p>}
                {s.bullets?.length > 0 && (
                  <ul className={styles.bullets}>
                    {s.bullets.map((b, i) => {
                      const idx = b.indexOf(":");
                      return idx > 0 && idx < 45 ? (
                        <li key={i}><strong>{b.slice(0, idx)}:</strong>{b.slice(idx + 1)}</li>
                      ) : (
                        <li key={i}>{b}</li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}

            {closing && <p className={styles.intro}>{closing}</p>}

            {/* Pagination */}
            {displaying && (
              <div className={styles.pager}>
                <span className={styles.displaying}>{displaying}</span>
                <div className={styles.pages}>
                  <span className={styles.pageArrow} aria-hidden="true">&laquo;</span>
                  <span className={`${styles.page} ${styles.pageActive}`} aria-current="page">1</span>
                  {pages.slice(1).map((p) => (
                    <Link key={p} href={`${pageBase}${p}/`} className={styles.page}>{p}</Link>
                  ))}
                  <Link href={`${pageBase}2/`} className={styles.pageArrow} aria-label="Next">&raquo;</Link>
                </div>
              </div>
            )}

            {/* Parts table */}
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
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}
