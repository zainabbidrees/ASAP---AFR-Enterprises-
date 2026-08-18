import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Cookie Policy | AFR Enterprises",
  description:
    "How AFR Enterprises uses cookies on afrenterprises.com, what each category does, and how to withdraw your consent at any time.",
};

// Static legal template (§4.11). Deliberately plain: no imagery, no CTA, one
// column, generous line length — a page people read once and leave.
const SECTIONS = [
  {
    h: "What are cookies?",
    p: [
      "Cookies are small text files placed on your device when you visit a website. They let the site remember what you did (the items in your cart, whether you have dismissed a banner, which search you last ran) so it behaves consistently between pages and between visits.",
      "Cookies cannot read other files on your device, and they cannot carry executable code. They store text, and only the site that set a cookie can read it back.",
    ],
  },
  {
    h: "How we use cookies",
    p: [
      "We use cookies to keep the site working and to understand which parts of the catalog people actually use. In practice that means remembering your cart and RFQ progress between pages, keeping the cookie banner dismissed once you have answered it, and measuring in aggregate which categories and part types get searched.",
      "We do not use cookies to build advertising profiles, and we do not sell what they record. Nothing we store through cookies is shared with third parties for their own purposes.",
    ],
  },
  {
    h: "The categories we set",
    list: [
      ["Strictly necessary", "Session handling, cart contents, RFQ form state and security. The site cannot function without these, so they are not optional."],
      ["Preference", "Remembers choices you have made (dismissed notices, the search mode you last used) so you are not asked twice."],
      ["Analytics", "Aggregate, de-identified measurement of page and search activity. Tells us which categories to expand; never used to identify you individually."],
    ],
  },
  {
    h: "Third-party cookies",
    p: [
      "Some pages embed services operated by others: analytics measurement and, on forms, bot protection. Those providers may set their own cookies, governed by their own policies rather than this one. We keep the list of such services as short as the site can function with.",
    ],
  },
  {
    h: "Withdrawing your consent",
    p: [
      "You can withdraw consent at any time by clearing cookies for this site in your browser settings, or by declining non-essential cookies when the banner appears. Every current browser also lets you block cookies outright or delete them per site.",
      "Blocking strictly necessary cookies will break the cart and the RFQ forms. That is a limitation of how those features work, not a preference on our part.",
    ],
  },
  {
    h: "Changes to this policy",
    p: [
      "If we change what we set or why, we will update this page and the date below. Material changes will re-trigger the consent banner rather than take effect silently.",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className={styles.doc}>
            <h1 className={styles.h1}>Cookie Policy</h1>
            <p className={styles.updated}>Last updated 17 August 2026</p>

            <p className={styles.lead}>
              This policy explains what cookies afrenterprises.com sets, what each one does, and how to
              turn off the ones that are not essential.
            </p>

            {SECTIONS.map((s) => (
              <section key={s.h}>
                <h2 className={styles.h2}>{s.h}</h2>
                {s.p?.map((para) => <p className={styles.p} key={para.slice(0, 40)}>{para}</p>)}
                {s.list && (
                  <dl className={styles.defs}>
                    {s.list.map(([term, def]) => (
                      <div className={styles.def} key={term}>
                        <dt>{term}</dt>
                        <dd>{def}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}

            <section>
              <h2 className={styles.h2}>Questions</h2>
              <p className={styles.p}>
                Email{" "}
                <a href="mailto:sales@afrenterprises.com">sales@afrenterprises.com</a> or write to AFR
                Enterprises, 1341 South Sunkist Street, Anaheim, CA 92806, United States. Our{" "}
                <Link href="/contact/">contact page</Link> has the direct numbers.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
