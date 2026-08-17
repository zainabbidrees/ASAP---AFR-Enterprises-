import Link from "next/link";
import styles from "./page.module.css";
import { POSTS, CATEGORIES, RECENT } from "@/data/blog";

export const metadata = {
  title: "AFR Enterprises Blog | Latest News on Aviation & Electronic Parts",
  description:
    "Guides and insights from AFR Enterprises on decoding part numbers, NSN/NIIN/CAGE lookups, electromechanical switches, fuse resistors, and sourcing best practices.",
};

const PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function BlogPage() {
  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          {/* Posts */}
          <div className={styles.main}>
            <h1 className="section-title section-title--left">AFR Enterprises Blog</h1>

            {POSTS.map((p) => (
              <article className={styles.card} key={p.href}>
                <h2 className={styles.cardTitle}>
                  <Link href={p.href}>{p.title}</Link>
                </h2>
                <div className={styles.cardBody}>
                  <p className={styles.excerpt}>
                    {p.excerpt} <Link className={styles.readMore} href={p.href}>Read more &raquo;</Link>
                  </p>
                  <div className={styles.meta}>
                    <span className={styles.metaPill}><span className="ico" aria-hidden="true" /> Posted On {p.date}</span>
                    <span className={styles.metaPill}><span className="ico" aria-hidden="true" /> John Smith</span>
                    <Link className={styles.metaPill} href={p.category[1]}><span className="ico" aria-hidden="true" /> {p.category[0]}</Link>
                    <span className={styles.share}>
                      <a href="#" aria-label="Share on Facebook" className={styles.shareIcon} />
                      <a href="#" aria-label="Share on Twitter" className={styles.shareIcon} />
                      <a href="#" aria-label="Share on LinkedIn" className={styles.shareIcon} />
                    </span>
                  </div>
                </div>
              </article>
            ))}

            {/* Pagination */}
            <div className={styles.pager}>
              <span className={styles.displaying}>Displaying Page: 1 of 25</span>
              <div className={styles.pages}>
                <span className={styles.pageArrow} aria-hidden="true">&laquo;</span>
                <span className={`${styles.page} ${styles.pageActive}`} aria-current="page">1</span>
                {PAGES.slice(1).map((p) => (
                  <Link key={p} href={`/blog/page/${p}/`} className={styles.page}>{p}</Link>
                ))}
                <Link href="/blog/page/2/" className={styles.pageArrow} aria-label="Next">&raquo;</Link>
              </div>
            </div>
          </div>

          {/* Blog sidebar */}
          <aside className={styles.sidebar}>
            <form className={styles.search} action="/blog/" method="get" role="search">
              <input type="text" name="s" placeholder="Blog Search..." aria-label="Blog Search" />
              <button type="submit" aria-label="Search">🔍</button>
            </form>

            <div className={styles.box}>
              <h3 className={styles.boxHead}>Categories</h3>
              <ul className={styles.catList}>
                {CATEGORIES.map(([label, href]) => (
                  <li key={href}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </div>

            <div className={styles.box}>
              <h3 className={styles.boxHead}>Recent Blogs</h3>
              <ul className={styles.recentList}>
                {RECENT.map(([label, href]) => (
                  <li key={href}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
