import Link from "next/link";
import { notFound } from "next/navigation";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import { CATEGORIES, POSTS, RECENT } from "@/data/blog";
import { titleize } from "@/lib/catalog";
import styles from "./page.module.css";

// Article page. The blog data carries a real title, date, category and opening
// paragraph per post; the body below builds out from that opening rather than
// inventing technical claims we can't stand behind — the closing sections are
// what AFR can actually say about sourcing the parts in question.
export function generateStaticParams() {
  return POSTS.map((p) => ({ post: p.href.split("/").filter(Boolean).pop() }));
}

function findPost(slug) {
  return POSTS.find((p) => p.href === `/blog/${slug}/`);
}

export async function generateMetadata({ params }) {
  const post = findPost(params.post);
  if (!post) return { title: "Article Not Found | AFR Enterprises" };
  return {
    title: `${post.title} | AFR Enterprises Blog`,
    description: post.excerpt.slice(0, 185).trim() + "…",
    openGraph: { title: post.title, type: "article", publishedTime: post.date },
  };
}

export default function ArticlePage({ params }) {
  const post = findPost(params.post);
  if (!post) notFound();

  const [catName, catHref] = post.category;
  const idx = POSTS.indexOf(post);
  const prev = POSTS[idx - 1];
  const next = POSTS[idx + 1];
  const related = POSTS.filter((p) => p !== post && p.category[0] === catName).slice(0, 3);

  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <article className={styles.main}>
            <p className={styles.meta}>
              <Link href={catHref}>{catName}</Link>
              <span className={styles.dot} aria-hidden="true">·</span>
              <time>{post.date}</time>
            </p>

            <h1 className={styles.h1}>{post.title}</h1>

            <div className={styles.body}>
              <p className={styles.standfirst}>{post.excerpt}</p>

              <h2>What to weigh before you specify</h2>
              <p>
                Most sourcing decisions in this area come down to three questions asked in order: does
                the part meet the standard the application is held to, can the supplier prove where it
                came from, and will it arrive before the deadline that actually matters. Getting the
                order of those questions right saves more programmes than any single specification
                choice does.
              </p>
              <p>
                Traceability is the one that tends to get deferred, and it is the one that costs most
                when it is missing. A part that performs correctly but cannot be traced to an approved
                source is a finding waiting to happen at the next audit — and on a flight-critical
                assembly, a finding means the part comes back out.
              </p>

              <h2>How AFR Enterprises handles it</h2>
              <p>
                Every line we ship is traceable to an approved source. We are AS9120B and ISO
                9001:2015 certified, FAA AC 00-56B accredited, AS6081 certified for counterfeit
                avoidance and ITAR registered, and we handle electronics to ANSI/ESD S20.20. Incoming
                inspection, document verification and — where the part calls for it — electronic test
                happen before anything leaves the building.
              </p>
              <p>
                On the commercial side: you get a named specialist rather than a queue, pricing and
                lead time in writing within 15 minutes, and an AOG desk staffed continuously. If we
                cannot hit your date we say so on the first reply instead of the third.
              </p>

              <h2>Getting a quote</h2>
              <p>
                Send the part number, the quantity and the date you need it by. No account, no minimum
                order, no obligation to proceed — and the specialist who quotes the part is the one who
                sees it shipped.
              </p>
            </div>

            <div className={styles.cta}>
              <h2 className={styles.ctaTitle}>Need a quote on the parts in this article?</h2>
              <p className={styles.ctaBody}>
                Pricing, availability, condition and lead time in writing — normally inside 15 minutes.
              </p>
              <Link className="btn" href="/straightrfq/">Request a Quote</Link>
            </div>

            {/* Prev / next through the archive */}
            <nav className={styles.pagerNav} aria-label="More articles">
              {prev ? (
                <Link className={styles.pagerPrev} href={prev.href}>
                  <span className={styles.pagerLabel}>Previous</span>
                  <span className={styles.pagerTitle}>{prev.title}</span>
                </Link>
              ) : <span />}
              {next && (
                <Link className={styles.pagerNext} href={next.href}>
                  <span className={styles.pagerLabel}>Next</span>
                  <span className={styles.pagerTitle}>{next.title}</span>
                </Link>
              )}
            </nav>

            {related.length > 0 && (
              <>
                <h2 className={styles.blockTitle}>More on {catName}</h2>
                <ul className={styles.related}>
                  {related.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href}>{p.title}</Link>
                      <span className={styles.relatedDate}>{p.date}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>

          <aside className={styles.rail}>
            <div className={styles.railBox}>
              <h2 className={styles.railTitle}>Recent articles</h2>
              <ul className={styles.railList}>
                {RECENT.map(([title, href]) => (
                  <li key={href}><Link href={href}>{title}</Link></li>
                ))}
              </ul>
            </div>
            <div className={styles.railBox}>
              <h2 className={styles.railTitle}>Categories</h2>
              <ul className={styles.railTags}>
                {CATEGORIES.slice(0, 14).map(([name, href]) => (
                  <li key={href}><Link href={href}>{titleize(name.toLowerCase().replace(/\s+/g, "-"))}</Link></li>
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
