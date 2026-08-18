import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

// Hero — full-bleed machining image with a dark scrim; content overlaid.
// Left: eyebrow + big tight headline + subhead + CTAs + trust row (white).
// Right: a clean RFQ card (the conversion engine → /straightrfq/).
// The header is a separate solid bar above; it no longer floats over this image.
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Image
        className={styles.bg}
        src="/hero-machining.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 className={styles.title} id="hero-title">
            Mission-critical parts,
            <br />
            quoted in <span className={styles.mark}>15 minutes</span>.
          </h1>
          <p className={styles.subtitle}>
            We track down the aviation, defense, and electronic components others
            can&apos;t: obsolete, back-ordered, or needed on an AOG deadline. Every part
            ships warrantied and fully traceable.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/straightrfq/">
              Request a quote
            </Link>
            <Link className={styles.secondary} href="/manufacturer/">
              Browse the catalog <span aria-hidden="true">&#8594;</span>
            </Link>
          </div>
        </div>

        {/* RFQ card — minimal fields → /straightrfq/ */}
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <h2 className={styles.cardTitle}>Start an RFQ</h2>
            <span className={styles.cardPill}>
              <span className={styles.dot} aria-hidden="true" />
              15-min response
            </span>
          </div>
          <form className={styles.form} action="/straightrfq/" method="post">
            <label className={styles.field}>
              <span>Part number</span>
              <input type="text" name="partNumber" placeholder="e.g. 3291186-6" required />
            </label>
            <div className={styles.dual}>
              <label className={styles.field}>
                <span>Quantity</span>
                <input type="text" name="quantity" placeholder="10" required />
              </label>
              <label className={styles.field}>
                <span>Target price</span>
                <input type="text" name="targetPrice" placeholder="Optional" />
              </label>
            </div>
            <label className={styles.field}>
              <span>Work email</span>
              <input type="email" name="email" placeholder="you@company.com" required />
            </label>
            <button className={styles.submit} type="submit">Get my quote</button>
            <p className={styles.cardNote}>No account needed. Quotes are free, 24/7.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
