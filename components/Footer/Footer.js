import Link from "next/link";
import styles from "./Footer.module.css";

/* ---- Inline logo/glyph set (kept local so the footer is self-contained) ---- */
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 4.5h3.2l1.2 4-2 1.3a12 12 0 0 0 5 5l1.3-2 4 1.2v3.2a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 2.5 6.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);
const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.5 3h3l-6.6 7.6L21.8 21h-5.9l-4.3-5.6L6.5 21H3.4l7-8.1L2.6 3h6l3.9 5.2L17.5 3Zm-2.1 16.1h1.6L8.7 4.8H7L15.4 19.1Z" />
  </svg>
);
const RssIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="6" cy="18" r="2.1" /><path d="M4 10.2a9.8 9.8 0 0 1 9.8 9.8h-2.9A6.9 6.9 0 0 0 4 13.1v-2.9Z" />
    <path d="M4 4a16 16 0 0 1 16 16h-2.9A13.1 13.1 0 0 0 4 6.9V4Z" />
  </svg>
);

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/asap_aerospace/", icon: <IgIcon /> },
  { label: "X (Twitter)", href: "https://twitter.com/JustNSNParts", icon: <XIcon /> },
  { label: "Blog", href: "/blog/", icon: <RssIcon />, internal: true },
];

const EXTENSIONS = [
  { label: "Chrome", href: "https://chromewebstore.google.com/detail/asap-semiconductor/concgmfclhggfpmnjgmmckhdgkhjhhka" },
  { label: "Firefox", href: "https://addons.mozilla.org/en-US/firefox/addon/asap-semiconductor/" },
  { label: "Edge", href: "https://microsoftedge.microsoft.com/addons/detail/asap-semiconductor/bfgaogkjmgemjmbekhjkhakkoknebofo" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Contact */}
        <div className={styles.contact}>
          <h3 className={styles.head}>Get in touch</h3>
          <address className={styles.address}>
            <p><span className={styles.ai}><PinIcon /></span> 1341 South Sunkist Street,<br />Anaheim, CA 92806</p>
            <p><span className={styles.ai}><MailIcon /></span> <a href="mailto:sales@afrenterprises.com">sales@afrenterprises.com</a></p>
            <p><span className={styles.ai}><PhoneIcon /></span> <a href="tel:+17147054780">+1 (714) 705-4780</a></p>
          </address>

          <div className={styles.survey}>
            <h4 className={styles.surveyTitle}>How are we doing?</h4>
            <p>Your satisfaction is our priority. Take a moment to tell us how we&apos;re doing so we can keep improving your experience.</p>
            <a className={styles.surveyBtn} href="https://www.asapsemi.com/customersurvey.aspx" target="_blank" rel="noopener">
              Take the survey <span aria-hidden="true">&#8594;</span>
            </a>
          </div>
        </div>

        {/* Company */}
        <nav className={styles.col} aria-label="Company">
          <h3 className={styles.head}>Company</h3>
          <ul className={styles.links}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/aboutus/">About Us</Link></li>
            <li><a href="https://www.asapsemi.com/quality/" target="_blank" rel="noopener">Quality</a></li>
            <li><Link href="/part-types/electronics/">Electronics Parts</Link></li>
            <li><Link href="/part-types/hardware/">Hardware Parts</Link></li>
            <li><Link href="/part-types/aviation/">Aviation Parts</Link></li>
            <li><Link href="/blog/">Blog</Link></li>
            <li><Link href="/sitemap/">Sitemap</Link></li>
          </ul>
        </nav>

        {/* Policies + terms */}
        <nav className={styles.col} aria-label="Policies">
          <h3 className={styles.head}>Policies</h3>
          <ul className={styles.links}>
            <li><a href="https://www.asapsemi.com/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a></li>
            <li><Link href="/cookie-policy/">Cookie Policy</Link></li>
            <li><a href="https://www.asapsemi.com/asap-semiconductor-conflict-minerals-policy.pdf" target="_blank" rel="noopener">Conflict Minerals Policy</a></li>
            <li><a href="https://www.asapsemi.com/pct/" target="_blank" rel="noopener">Combating Human Trafficking</a></li>
          </ul>
          <h3 className={styles.head}>Terms &amp; conditions</h3>
          <ul className={styles.links}>
            <li><a href="https://www.asapsemi.com/customer-terms-and-conditions/" target="_blank" rel="noopener">Customer Terms</a></li>
            <li><a href="https://www.asapsemi.com/supplier-terms-and-conditions/" target="_blank" rel="noopener">Supplier Terms</a></li>
            <li><a href="https://www.asapsemi.com/far-and-dfar-flow-downs.pdf" target="_blank" rel="noopener">FAR &amp; DFARS Flow Downs</a></li>
            <li><a href="https://www.asapsemi.com/consignment-options/" target="_blank" rel="noopener">Consignment Options</a></li>
          </ul>
        </nav>

        {/* Pay + social + extensions */}
        <div className={styles.col}>
          <h3 className={styles.head}>We accept</h3>
          <ul className={styles.pay} aria-label="Accepted payment methods">
            <li className={styles.payChip}><span className={styles.visa}>VISA</span></li>
            <li className={styles.payChip} aria-label="Mastercard">
              <svg viewBox="0 0 40 26" className={styles.mc} aria-hidden="true">
                <circle cx="16" cy="13" r="9" fill="#EB001B" /><circle cx="24" cy="13" r="9" fill="#F79E1B" />
                <path d="M20 6.2a9 9 0 0 0 0 13.6 9 9 0 0 0 0-13.6Z" fill="#FF5F00" />
              </svg>
            </li>
            <li className={styles.payChip}><span className={styles.amex}>AMEX</span></li>
            <li className={styles.payChip}><span className={styles.disc}>DISC<span className={styles.discBall} />VER</span></li>
          </ul>

          <h3 className={styles.head}>Follow us</h3>
          <ul className={styles.social}>
            {SOCIAL.map((s) => (
              <li key={s.label}>
                {s.internal ? (
                  <Link className={styles.iconBtn} href={s.href} aria-label={s.label}>{s.icon}</Link>
                ) : (
                  <a className={styles.iconBtn} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>{s.icon}</a>
                )}
              </li>
            ))}
          </ul>

          <h3 className={styles.head}>Browser extension</h3>
          <ul className={styles.ext}>
            {EXTENSIONS.map((e) => (
              <li key={e.label}>
                <a className={styles.extPill} href={e.href} target="_blank" rel="noopener">
                  {e.label} <span aria-hidden="true">&#8599;</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legal */}
      <div className={styles.legal}>
        <div className={`container ${styles.legalInner}`}>
          <p className={styles.disclaimer}>
            &quot;As an Independent Distributor, ASAP Semiconductor LLC is not affiliated with the
            manufacturers of the products it sells except as expressly noted otherwise. Any and all
            trademark rights associated with the manufacturers&apos; names and products are owned by the
            respective manufacturers. LINKING, FRAMING, MIRRORING, SCRAPING OR DATA-MINING STRICTLY
            PROHIBITED.&quot;
          </p>
          <p className={styles.copy}>&copy; 2026 AFR Enterprises. All rights reserved to ASAP Semiconductor LLC.</p>
        </div>
      </div>

      {/* Oversized wordmark — slow fade-in, clipped at the base */}
      <div className={styles.wordmarkWrap} aria-hidden="true">
        <span className={styles.wordmark}>AFR ENTERPRISES</span>
      </div>
    </footer>
  );
}
