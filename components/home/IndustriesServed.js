import Image from "next/image";
import styles from "./IndustriesServed.module.css";

// Industries Served — image-backed cards, one photo per sector. Title is always
// legible; on hover the photo zooms, the scrim deepens, and the card lifts.
const INDUSTRIES = [
  {
    title: "Civil Aviation",
    sub: "Airlines, MROs, and FAA 121/129/135 operators.",
    img: "/ind-civil-aviation.jpg",
  },
  {
    title: "Military & Defense",
    sub: "DoD, allied nations, and defense contractors.",
    img: "/ind-military.jpg",
  },
  {
    title: "IT Hardware",
    sub: "Enterprise IT, OEMs, and contract manufacturers.",
    img: "/ind-it-hardware.jpg",
  },
  {
    title: "Industrial & Automation",
    sub: "Manufacturing, oil & gas, energy, and marine.",
    img: "/ind-industrial.jpg",
  },
];

export default function IndustriesServed() {
  return (
    <section className={`section ${styles.section}`} id="industries" aria-labelledby="industries-title">
      <div className="container">
        <header className={styles.head}>
          <p className={styles.eyebrow}>Who we serve</p>
          <h2 className={styles.title} id="industries-title">Industries served</h2>
          <p className={styles.lead}>Who we keep flying, building, and running.</p>
        </header>

        <ul className={styles.grid}>
          {INDUSTRIES.map((it) => (
            <li className={styles.card} key={it.title}>
              <Image
                className={styles.img}
                src={it.img}
                alt=""
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 860px) 50vw, 25vw"
              />
              <span className={styles.scrim} aria-hidden="true" />
              <div className={styles.body}>
                <span className={styles.line} aria-hidden="true" />
                <h3 className={styles.cardTitle}>{it.title}</h3>
                <p className={styles.cardSub}>{it.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
