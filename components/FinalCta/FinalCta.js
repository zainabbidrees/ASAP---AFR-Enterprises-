import styles from "./FinalCta.module.css";

// Final CTA — the site's single closing block, shared by home, About and Contact.
//
// A contained dark panel that floats on the light page, lit by a soft bloom rising
// from its bottom edge. The bloom is white, not coloured: this design system spends
// its only chromatic accent on AOG, so luminance carries the drama instead of hue.
//
// One action, deliberately. It used to offer three equally-weighted pills (RFQ /
// AOG hotline / catalog), which made the visitor pick a door at the moment they
// should be acting. Now the section does the thing it was asking for: a single
// capture pill — part number in, quote out. The AOG line stays because a grounded
// aircraft is a genuinely different mode, but it is a phone number and a live dot
// rather than a competing button, and "browse catalog" is gone (it already lives in
// the header, footer and every inner-page rail).
//
// Plain GET form on purpose: no JavaScript required for the close to work, and the
// part number carries into the full RFQ form (see app/straightrfq/page.js).
// Deliberately not configurable: the close reads identically sitewide.
export default function FinalCta() {
  return (
    <section className={styles.block} aria-labelledby="final-cta-title">
      <div className="container">
        <div className={styles.panel}>
          <span className={styles.bloom} aria-hidden="true" />

          <div className={styles.content}>
            <h2 className={styles.title} id="final-cta-title">
              Got a part number?
              <br />
              Let&apos;s get you a quote.
            </h2>

            <p className={styles.sub}>
              Pricing, availability, condition and lead time — in writing, within 15 minutes.
            </p>

            {/* The one action, sized like a single button so the composition stays
                as quiet as it looks. */}
            <form className={styles.capture} action="/straightrfq/" method="get">
              <label className={styles.pill}>
                <span className={styles.srOnly}>Part number</span>
                <input
                  className={styles.field}
                  type="text"
                  name="partNumber"
                  placeholder="Enter a part number"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button className={styles.submit} type="submit">Get a quote</button>
              </label>
            </form>

            {/* Emergency path — a different mode, so it reads as a line, not a button. */}
            <p className={styles.aog}>
              <span className={styles.dot} aria-hidden="true" />
              Aircraft on ground?
              <a className={styles.aogNum} href="tel:1-714-705-4780">+1 (714) 705-4780</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
