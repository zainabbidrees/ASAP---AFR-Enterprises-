import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Sitemap | AFR Enterprises",
  description:
    "Full sitemap of AFR Enterprises. Browse parts, NSN catalogs, aircraft tooling, company information, policies, and terms.",
};

// A link is external if it starts with http.
const isExternal = (href) => /^https?:\/\//.test(href);

const GROUPS = [
  {
    title: "Browse Parts",
    links: [
      ["Manufacturers", "/manufacturer/"],
      ["Electronics Parts", "/part-types/electronics/"],
      ["Aviation Parts", "/part-types/aviation/"],
      ["Hardware Parts", "/part-types/hardware/"],
    ],
  },
  {
    title: "NSN Parts",
    links: [
      ["Parts By NIIN", "/nsn/niin-parts/"],
      ["Parts By FSC", "/nsn/fscs/"],
      ["Parts By NSN", "/nsn/nsn-parts/"],
      ["Manufacturers", "/nsn/manufacturer/"],
      ["CAGE Code", "/nsn/cage-codes/"],
      ["Part Types", "/nsn/part-types/"],
    ],
  },
  {
    title: "Aircraft Tooling",
    links: [
      ["Aircraft Engine Parts", "/aircraft-engine-parts/"],
      ["Aircraft Maintenance Tooling", "/aircraft-maintenance-tooling/"],
      ["Aircraft Engine Baffle", "/aircraft-engine-baffle/"],
      ["Avionics Test Equipment", "/avionics-test-equipment/"],
    ],
  },
  {
    title: "Company Information",
    links: [
      ["Home", "/"],
      ["About Us", "/aboutus/"],
      ["Quality", "https://www.asapsemi.com/quality/"],
      ["Electronics Parts", "/part-types/electronics/"],
      ["Hardware Parts", "/part-types/hardware/"],
      ["Aviation Parts", "/part-types/aviation/"],
      ["Blog", "/blog/"],
      ["Sitemap", "/sitemap/"],
    ],
  },
  {
    title: "Policies",
    links: [
      ["Privacy Policy", "https://www.asapsemi.com/privacy-policy/"],
      ["Cookie Policy", "/cookie-policy/"],
      ["Conflict Minerals Policy", "https://www.asapsemi.com/asap-semiconductor-conflict-minerals-policy.pdf"],
      ["Combating Human Trafficking Policy", "https://www.asapsemi.com/pct/"],
    ],
  },
  {
    title: "Terms & Conditions",
    links: [
      ["Customer Terms and Conditions", "https://www.asapsemi.com/customer-terms-and-conditions/"],
      ["Supplier Terms and Conditions", "https://www.asapsemi.com/supplier-terms-and-conditions/"],
    ],
  },
  {
    title: "Quick Links",
    links: [
      ["FAR & DFARS Flow Downs", "https://www.asapsemi.com/far-and-dfar-flow-downs.pdf"],
      ["Consignment Options", "https://www.asapsemi.com/consignment-options/"],
    ],
  },
  {
    title: "Get a Quote",
    links: [
      ["Request for Quote", "/straightrfq/"],
      ["Contact Us", "/contact/"],
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="section-title section-title--left">Sitemap</h1>

          <div className={styles.grid}>
            {GROUPS.map((g) => (
              <div className={styles.group} key={g.title}>
                <h2 className={styles.groupTitle}>{g.title}</h2>
                <ul className={styles.links}>
                  {g.links.map(([label, href]) => (
                    <li key={label + href}>
                      {isExternal(href) ? (
                        <a href={href} target="_blank" rel="noopener">{label}</a>
                      ) : (
                        <Link href={href}>{label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
