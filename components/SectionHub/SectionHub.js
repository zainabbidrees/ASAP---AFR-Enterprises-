import Link from "next/link";
import InnerSidebar from "@/components/Sidebar/InnerSidebar";
import styles from "./SectionHub.module.css";

// Section landing page for a URL that exists in the taxonomy but had no page of
// its own: /nsn/ and /part-types/. Both are directory roots people land on from
// breadcrumbs, search and old links, so each gets a real hub that routes onward
// rather than a 404.
//
// Props: eyebrow, h1, lead, cards[{title, body, href, label}], note
// (`breadcrumb` is still accepted but ignored — the breadcrumb bar was removed sitewide.)
export default function SectionHub({ breadcrumb = [], eyebrow, h1, lead, cards = [], note }) {
  return (
    <>
      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            <h1 className="section-title section-title--left">{h1}</h1>
            <p className={styles.lead}>{lead}</p>

            <ul className={styles.cards}>
              {cards.map((c) => (
                <li className={styles.card} key={c.href}>
                  <h2 className={styles.cardTitle}>
                    <Link href={c.href}>{c.title}</Link>
                  </h2>
                  <p className={styles.cardBody}>{c.body}</p>
                  <Link className={styles.cardLink} href={c.href}>
                    {c.label} <span aria-hidden="true">&#8594;</span>
                  </Link>
                </li>
              ))}
            </ul>

            {note && <p className={styles.note}>{note}</p>}
          </div>

          <InnerSidebar />
        </div>
      </section>
    </>
  );
}
