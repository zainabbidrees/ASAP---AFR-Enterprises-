import Link from "next/link";
import Image from "next/image";
import styles from "./FeaturedCategories.module.css";

// "Most requested" shortcut band. Photographic tiles reuse the homepage tile
// idiom (grayscale at rest -> full colour + zoom on hover). Deliberately an
// asymmetric bento (first item large, the rest stacked) rather than a row of
// equal cards.
export default function FeaturedCategories({ items = [], eyebrow = "Most requested" }) {
  const tiles = items.slice(0, 3);
  if (!tiles.length) return null;

  return (
    <section className={styles.wrap} aria-labelledby="featured-title">
      <p className={styles.eyebrow} id="featured-title">{eyebrow}</p>
      <div className={styles.bento}>
        {tiles.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.tile} ${i === 0 ? styles.large : ""}`}
          >
            <Image
              className={styles.img}
              src={item.img}
              alt=""
              fill
              sizes={i === 0 ? "(max-width: 760px) 100vw, 55vw" : "(max-width: 760px) 100vw, 30vw"}
            />
            <span className={styles.scrim} aria-hidden="true" />
            {item.tag && <span className={styles.tag}>{item.tag}</span>}
            <span className={styles.meta}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.go}>View parts <span aria-hidden="true">&#8594;</span></span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
