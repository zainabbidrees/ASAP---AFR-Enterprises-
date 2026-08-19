import Link from "next/link";
import styles from "./page.module.css";
import BlogIndex from "@/components/BlogIndex/BlogIndex";
import { POSTS, CATEGORIES } from "@/data/blog";

export const metadata = {
  title: "AFR Enterprises Blog | Latest News on Aviation & Electronic Parts",
  description:
    "Guides and insights from AFR Enterprises on decoding part numbers, NSN/NIIN/CAGE lookups, electromechanical switches, fuse resistors, and sourcing best practices.",
};

export default function BlogPage() {
  return (
    <section className="section">
      <div className="container">
        <header className={styles.head}>
          <p className={styles.eyebrow}>AFR Journal</p>
          <h1 className={styles.title}>Insights &amp; sourcing guides</h1>
          <p className={styles.lede}>
            Decoding part numbers, NSN / NIIN / CAGE lookups, switch and resistor selection,
            and procurement practices — written for the engineers and sourcing teams who keep
            aircraft and hardware running.
          </p>
        </header>

        <BlogIndex posts={POSTS} />

        <nav className={styles.topics} aria-label="Browse blog topics">
          <p className={styles.topicsLabel}>Browse all topics</p>
          <ul className={styles.topicsList}>
            {CATEGORIES.map(([label, href]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
