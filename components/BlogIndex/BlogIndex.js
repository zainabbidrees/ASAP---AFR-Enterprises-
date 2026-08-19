"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./BlogIndex.module.css";

// Evocative grayscale lead image per topic (real /public assets, measured-bright).
const HERO_IMG = {
  Electronics: "/tp-renesas.jpg",
  Aerospace: "/ind-civil-aviation.jpg",
};

export default function BlogIndex({ posts = [] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const cats = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category[0])))],
    [posts]
  );

  const q = query.trim().toLowerCase();
  const filtering = q.length > 0 || cat !== "All";

  const filtered = useMemo(
    () =>
      posts.filter((p) => {
        if (cat !== "All" && p.category[0] !== cat) return false;
        if (q && !`${p.title} ${p.excerpt}`.toLowerCase().includes(q)) return false;
        return true;
      }),
    [posts, q, cat]
  );

  const featured = posts[0];
  const rest = posts.slice(1);
  const heroImg = HERO_IMG[featured?.category?.[0]] || "/tp-renesas.jpg";

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <div className={styles.search}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.4-3.4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            aria-label="Search articles"
            autoComplete="off"
          />
          {q && <button className={styles.clear} type="button" onClick={() => setQuery("")}>Clear</button>}
        </div>
        <div className={styles.chips} aria-label="Filter by topic">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.chip} ${cat === c ? styles.chipOn : ""}`}
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtering ? (
        filtered.length ? (
          <ul className={styles.list}>
            {filtered.map((p) => <PostItem key={p.href} post={p} />)}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No articles match your search.</p>
            <p className={styles.emptyBody}>
              Try a different term, or{" "}
              <button className={styles.linkBtn} type="button" onClick={() => { setQuery(""); setCat("All"); }}>clear the filters</button>.
            </p>
          </div>
        )
      ) : (
        <>
          {featured && (
            <article className={styles.hero}>
              <div className={styles.heroText}>
                <p className={styles.heroEyebrow}>
                  <Link href={featured.category[1]}>{featured.category[0]}</Link>
                  <span className={styles.dot} aria-hidden="true">·</span>
                  <span>{featured.date}</span>
                </p>
                <h2 className={styles.heroTitle}>
                  <Link href={featured.href}>{featured.title}</Link>
                </h2>
                <p className={styles.heroExcerpt}>{featured.excerpt}</p>
                <Link className={styles.heroRead} href={featured.href}>
                  Read the guide <span aria-hidden="true">→</span>
                </Link>
              </div>
              <Link className={styles.heroMedia} href={featured.href} tabIndex={-1} aria-hidden="true">
                <Image className={styles.heroImg} src={heroImg} alt="" fill sizes="(max-width: 900px) 100vw, 42vw" priority />
                <span className={styles.heroScrim} aria-hidden="true" />
              </Link>
            </article>
          )}

          <div className={styles.listHead}>
            <p className={styles.listLabel}>More articles</p>
            <span className={styles.listCount}>{rest.length} more</span>
          </div>
          <ul className={styles.list}>
            {rest.map((p) => <PostItem key={p.href} post={p} />)}
          </ul>

          <nav className={styles.pager} aria-label="Blog pages">
            <span className={styles.pagerInfo}>Page 1</span>
            <div className={styles.pagerNums}>
              <span className={`${styles.pageBtn} ${styles.pageDisabled}`} aria-hidden="true">←</span>
              <span className={`${styles.pageBtn} ${styles.pageOn}`} aria-current="page">1</span>
              {[2, 3, 4, 5].map((n) => (
                <Link key={n} href={`/blog/page/${n}/`} className={styles.pageBtn}>{n}</Link>
              ))}
              <Link href="/blog/page/2/" className={styles.pageBtn} aria-label="Next page">→</Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}

function PostItem({ post }) {
  return (
    <li className={styles.item}>
      <p className={styles.itemEyebrow}>
        <span>{post.category[0]}</span>
        <span className={styles.dot} aria-hidden="true">·</span>
        <span>{post.date}</span>
      </p>
      <h3 className={styles.itemTitle}>
        <Link href={post.href}>{post.title}</Link>
      </h3>
      <p className={styles.itemExcerpt}>{post.excerpt}</p>
      <Link className={styles.itemRead} href={post.href}>
        Read <span aria-hidden="true">→</span>
      </Link>
    </li>
  );
}
