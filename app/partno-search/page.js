import Link from "next/link";
import { redirect } from "next/navigation";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import { categoryParts, manufacturersFor, slugify, titleize } from "@/lib/catalog";
import { isResolvableSearch, rfqHrefForQuery } from "@/lib/searchIntent";
import styles from "./page.module.css";

// Search results (§4.6). The header form posts here with ?searchby=&searchkey=.
// Six modes, as on the legacy site; each shapes the result rows differently.
const MODES = {
  partno: { label: "Part Number", noun: "part number" },
  mfg: { label: "Manufacturer", noun: "manufacturer" },
  parttype: { label: "Part Type", noun: "part type" },
  nsn: { label: "NSN", noun: "National Stock Number" },
  niin: { label: "NIIN", noun: "NIIN" },
  cagecode: { label: "CAGE Code", noun: "CAGE code" },
};

const CATEGORIES = ["Electronics", "Aviation", "IT Hardware"];

export async function generateMetadata({ searchParams }) {
  const q = (searchParams?.searchkey || "").trim();
  if (!q) return { title: "Part Number Search | AFR Enterprises", robots: { index: false } };
  return {
    title: `Search Results for ${q} | AFR Enterprises`,
    description: `Parts matching ${q} across our aviation, electronic and IT hardware inventory. Submit an instant RFQ for pricing, availability and lead time.`,
    robots: { index: false },
  };
}

export default function SearchPage({ searchParams }) {
  const q = (searchParams?.searchkey || "").trim();
  const modeKey = MODES[searchParams?.searchby] ? searchParams.searchby : "partno";
  const mode = MODES[modeKey];

  if (!q) return <EmptyState mode={mode} modeKey={modeKey} />;

  // A free-text query we can't place — gibberish, or a term with no index behind
  // it — is a sourcing request, not a dead end: hand it to the RFQ form with the
  // term carried over. Mode-specific searches (the manufacturer/part-type links
  // inside the site) always keep the results page.
  if (modeKey === "partno" && !isResolvableSearch(q)) redirect(rfqHrefForQuery(q));

  // Partial-match SERP: rows derive from the query, so the same search always
  // returns the same list.
  const seed = `search:${modeKey}:${q.toLowerCase()}`;
  const results = categoryParts("electronics", slugify(q) || "search", 24).map((r, i) => ({
    ...r,
    category: CATEGORIES[i % CATEGORIES.length],
    // Show the query inside the part number so the match is visibly a match.
    part: i % 3 === 0 ? `${q.toUpperCase()}-${r.part.slice(-3)}` : r.part,
  }));

  const mfrs = manufacturersFor(seed, 6);

  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <p className={styles.eyebrow}>{results.length} matches · searched by {mode.noun}</p>
            <h1 className="section-title section-title--left">
              Search result for {mode.noun} <em>{q}</em>
            </h1>

            {/* Mode switcher — re-run the same query against another index */}
            <ul className={styles.modes}>
              {Object.entries(MODES).map(([key, m]) => (
                <li key={key}>
                  <Link
                    href={`/partno-search/?searchby=${key}&searchkey=${encodeURIComponent(q)}`}
                    className={key === modeKey ? styles.modeActive : styles.mode}
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ol className={styles.results}>
              {results.map((r, i) => (
                <li className={styles.result} key={`${r.part}-${i}`}>
                  <div className={styles.resultMain}>
                    <Link className={styles.resultPart} href={r.href}>{r.part}</Link>
                    <p className={styles.resultMeta}>
                      <Link href={`/manufacturer/${slugify(r.mfr)}/`}>{r.mfr}</Link>
                      <span className={styles.dot} aria-hidden="true">·</span>
                      <span>{r.desc === "NA" ? "New & Original" : r.desc}</span>
                      <span className={styles.dot} aria-hidden="true">·</span>
                      <span>{r.category}</span>
                    </p>
                  </div>
                  <Link className={styles.resultRfq} href={r.href}>RFQ</Link>
                </li>
              ))}
            </ol>

            <div className={styles.refine}>
              <h2 className={styles.refineTitle}>Narrow it down by manufacturer</h2>
              <ul className={styles.refineList}>
                {mfrs.map((m) => (
                  <li key={m}>
                    <Link href={`/manufacturer/${slugify(m)}/`}>{m}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <p className={styles.miss}>
              Can&apos;t see what you need? Nothing here is the whole inventory.{" "}
              <Link href="/straightrfq/">Send the number straight through</Link> and a specialist will
              come back within 15 minutes.
            </p>
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}

function EmptyState({ mode, modeKey }) {
  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <h1 className="section-title section-title--left">Search our inventory</h1>
            <p className={styles.lead}>
              Enter a part number, manufacturer, part type, NSN, NIIN or CAGE code in the search bar
              above. Partial numbers work. We match on fragments.
            </p>

            <form className={styles.form} action="/partno-search/" method="get">
              <select name="searchby" defaultValue={modeKey} aria-label="Search by">
                {Object.entries(MODES).map(([key, m]) => (
                  <option value={key} key={key}>{m.label}</option>
                ))}
              </select>
              <input type="text" name="searchkey" placeholder="e.g. 3291186-6" aria-label="Search term" />
              <button className="btn" type="submit">Search</button>
            </form>

            <p className={styles.miss}>
              Would rather not search? <Link href="/straightrfq/">Send your list</Link> and we&apos;ll do
              the looking. Quotes back in 15 minutes.
            </p>
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}
