import Link from "next/link";
import Image from "next/image";
import styles from "./TopParts.module.css";

// Top-requested part numbers — image tiles. At rest each tile sits in grayscale
// with its part number + category; on hover it bursts into full color, zooms, and
// reveals the manufacturer plus a "Request a quote" button.
const PARTS = [
  { part: "3291186-6", mfr: "Honeywell Aerospace", cat: "Aviation", href: "/rfq/honeywell-aerospace/3291186-6/", img: "/tp-honeywell.jpg" },
  { part: "CHO-BOND 1029", mfr: "Parker Hannifin Corp", cat: "Board-Level", href: "/rfq/parker-hannifin-corp/cho-bond-1029/", img: "/tp-parker.jpg" },
  { part: "M30876MJ-XXXGP", mfr: "Renesas Electronics", cat: "Semiconductors", href: "/rfq/renesas-electronics-america/m30876mj-xxxgp/", img: "/tp-renesas.jpg" },
  { part: "ADTS-403", mfr: "Druck GE", cat: "Avionics Test", href: "/avionics-test-equipment/rfq/druck-ge-gensing/adts-403/", img: "/tp-druck.jpg" },
  { part: "J3103", mfr: "ASUS Computer Intl", cat: "IT Hardware", href: "/rfq/asus-computer-international/j3103/", img: "/tp-asus.jpg" },
  { part: "429EX", mfr: "BF Goodrich / JcAIR", cat: "Avionics Test", href: "/avionics-test-equipment/rfq/bf-goodrich-jc-air/429ex/", img: "/tp-goodrich.jpg" },
  { part: "TMBXX-6517-A2M", mfr: "Andrew", cat: "Connectors", href: "/rfq/andrew/tmbxx-6517-a2m/", img: "/tp-andrew.jpg" },
  { part: "MIT115A5002", mfr: "Boeing", cat: "Aircraft Tooling", href: "/aircraft-maintenance-tooling/rfq/boeing/b737-all-series-tooling/mit115a5002/", img: "/tp-boeing.jpg" },
  { part: "OD3X3-XXXXDD", mfr: "Motorola", cat: "Semiconductors", href: "/rfq/motorola/od3x3-xxxxdd/", img: "/tp-motorola.jpg" },
];

export default function TopParts() {
  return (
    <section className={styles.section} aria-labelledby="top-parts-title">
      <div className="container">
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Most requested</p>
            <h2 className={styles.title} id="top-parts-title">Top-requested part numbers</h2>
            <p className={styles.lead}>The line items buyers ask us for most — hover any part to start an RFQ.</p>
          </div>
          <Link className={styles.viewAll} href="/manufacturer/">Browse all parts <span aria-hidden="true">&#8594;</span></Link>
        </header>

        <ul className={styles.grid}>
          {PARTS.map((p) => (
            <li className={styles.tile} key={p.part + p.mfr}>
              <Image
                className={styles.img}
                src={p.img}
                alt=""
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 33vw"
              />
              <span className={styles.scrim} aria-hidden="true" />
              <div className={styles.content}>
                <span className={styles.cat}>{p.cat}</span>
                <div className={styles.info}>
                  <h3 className={styles.part}>
                    <Link className={styles.partLink} href={p.href}>{p.part}</Link>
                  </h3>
                  <div className={styles.reveal}>
                    <p className={styles.mfr}>{p.mfr}</p>
                    <Link className={styles.rfq} href="/straightrfq/">
                      Request a quote <span aria-hidden="true">&#8594;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
