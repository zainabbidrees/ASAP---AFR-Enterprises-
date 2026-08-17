import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import { CATEGORIES, POSTS, RECENT } from "@/data/blog";
import styles from "./page.module.css";

// Category archive. Categories the blog data references but has no post for yet
// render as an honest empty state rather than a 404 — the legacy site links to all
// of them from the sidebar.
export function generateStaticParams() {
  return CATEGORIES.map(([, href]) => ({ cat: href.split("/").filter(Boolean).pop() }));
}

function findCategory(slug) {
  return CATEGORIES.find(([, href]) => href === `/blog/category/${slug}/`);
}

export async function generateMetadata({ params }) {
  const found = findCategory(params.cat);
  const name = found ? found[0] : params.cat.replace(/-/g, " ");
  return {
    title: `${name} Articles | AFR Enterprises Blog`,
    description: `Articles on ${name.toLowerCase()} from AFR Enterprises — parts sourcing, traceability, certification and procurement for aerospace, defense and industrial buyers.`,
  };
}

export default function CategoryArchive({ params }) {
  const found = findCategory(params.cat);
  const name = found ? found[0] : params.cat.replace(/-/g, " ");
  const posts = POSTS.filter((p) => p.category[1] === `/blog/category/${params.cat}/`);

  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <p className={styles.eyebrow}>
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </p>
            <h1 className="section-title section-title--left">{name}</h1>

            {posts.length > 0 ? (
              <ul className={styles.posts}>
                {posts.map((p) => (
                  <li className={styles.post} key={p.href}>
                    <p className={styles.postMeta}>{p.date}</p>
                    <h2 className={styles.postTitle}><Link href={p.href}>{p.title}</Link></h2>
                    <p className={styles.postExcerpt}>{p.excerpt.slice(0, 260).trim()}…</p>
                    <Link className={styles.readMore} href={p.href}>Read more <span aria-hidden="true">&#8594;</span></Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>
                Nothing published under {name} yet. <Link href="/blog/">Browse every article</Link>, or
                skip the reading and <Link href="/straightrfq/">send us a part number</Link>.
              </p>
            )}

            <h2 className={styles.blockTitle}>Other categories</h2>
            <ul className={styles.tags}>
              {CATEGORIES.filter(([, href]) => href !== `/blog/category/${params.cat}/`)
                .slice(0, 20)
                .map(([label, href]) => (
                  <li key={href}><Link href={href}>{label}</Link></li>
                ))}
            </ul>
          </div>

          <aside className={styles.rail}>
            <div className={styles.railBox}>
              <h2 className={styles.railTitle}>Recent articles</h2>
              <ul className={styles.railList}>
                {RECENT.map(([title, href]) => (
                  <li key={href}><Link href={href}>{title}</Link></li>
                ))}
              </ul>
            </div>
            <InnerSidebar showBrowse={false} />
          </aside>
        </div>
      </section>
    </>
  );
}
