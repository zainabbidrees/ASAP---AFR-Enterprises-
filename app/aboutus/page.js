import Image from "next/image";
import PageHero from "@/components/PageHero/PageHero";
import FinalCta from "@/components/FinalCta/FinalCta";
import StatsCounter from "./StatsCounter";
import LeadershipShowcase from "./LeadershipShowcase";
import styles from "./page.module.css";

export const metadata = {
  title: "About Us | Aerospace & Industrial Parts Supply | AFR Enterprises",
  description:
    "AFR Enterprises sources aerospace, defense and industrial parts held to a standard you can audit: AS9120B, ISO 9001:2015, FAA AC 0056B and ITAR registered. A named specialist on every order, an AOG desk staffed 24/7, and full traceability on every shipment. An ASAP Semiconductor company in Anaheim, California.",
};

// Industries — folded into the hero so a visitor sees who we serve immediately.
const INDUSTRIES = [
  { name: "Aerospace", icon: "plane" },
  { name: "Defense", icon: "shield" },
  { name: "Industrial", icon: "gear" },
  { name: "Commercial", icon: "building" },
  { name: "Energy", icon: "bolt" },
  { name: "OEMs & MROs", icon: "tools" },
];

// What we stand for — four values. Each line has to name something a buyer could
// actually hold us to (a document, a certificate, a phone that gets answered);
// anything that couldn't be checked was cut. Each carries a real photograph of
// the moment that promise is kept. `pos` tunes the square crop so the subject
// survives it.
const VALUES = [
  {
    n: "01", name: "We quote what we can get",
    line: "If a line is going to be difficult, or the lead time is an estimate rather than a commitment, that goes in the quote. You should never find out on the promised date.",
    img: "/photos/value-integrity.jpg", pos: "52% 42%",
    alt: "Two AFR Enterprises specialists reviewing a parts document together before committing to a quote",
  },
  {
    n: "02", name: "One person owns your order",
    line: "The representative who quotes your part is the one who sees it shipped. No ticket queue, no call centre, nobody to re-explain the requirement to.",
    img: "/photos/value-ownership.jpg", pos: "58% 40%",
    alt: "An AFR Enterprises specialist working a single order and its paperwork at the pick face",
  },
  {
    n: "03", name: "Everything ships documented",
    line: "Certifications and traceability back to an approved source, in the box. We are AS9120B and ISO 9001:2015 certified and audited against both.",
    img: "/photos/value-documented.jpg", pos: "52% 46%",
    alt: "Specialists pulling stock and its record folders from the bin-located racking in Anaheim",
  },
  {
    n: "04", name: "The desk is always staffed",
    line: "Quotes come back inside 15 minutes, day or night. The AOG line is answered by a person 24 hours a day, every day of the year.",
    img: "/photos/value-responsiveness.jpg", pos: "56% 45%",
    alt: "Two specialists working a live parts request at the inspection bench",
  },
];

// Commitment statement — split to tokens so each word can ignite in sequence on scroll.
const COMMITMENT_LEAD = "Every quote we send is a part we can actually get, at a lead time we can actually hold,".split(" ");
const COMMITMENT_TAIL = "with the paperwork to prove where it came from.".split(" ");

// The reasons buyers stay. Deliberately about CAPABILITY — what we can actually
// get and how it ships — because the values band above already covers conduct
// (honesty, ship dates, paperwork, answering). Six overlapping items were cut to
// four; the claim carries the meaning and the note just qualifies it, so the
// section reads in one pass instead of six paragraphs.
const EDGE = [
  {
    n: "01", claim: "The lines nobody else quotes",
    note: "Obsolete, end-of-life and long-lead part numbers",
    img: "/photos/edge-inventory.jpg",
    alt: "An operator moving stock through the racking at the Anaheim warehouse",
  },
  {
    n: "02", claim: "5,000+ vetted sources",
    note: "Franchised distributors and approved manufacturers only",
    img: "/photos/edge-vetted.jpg",
    alt: "Two specialists checking supplier paperwork at the inspection bench",
  },
  {
    n: "03", claim: "Screened for counterfeits",
    note: "AS6081 certified · ANSI/ESD S20.20 handling",
    img: "/photos/edge-condition.jpg",
    alt: "Parts being inspected and recorded before packing",
  },
  {
    n: "04", claim: "Cleared to ship worldwide",
    note: "ITAR registered · export screened · CAGE code 6RE77",
    img: "/photos/edge-export.jpg",
    alt: "An outbound carton being sealed for shipment",
  },
];

// Leadership — real named people, shown one at a time by <LeadershipShowcase />.
// Titles are client-confirmed. TODO (client to confirm): both bios are still
// placeholders written in AFR's voice — replace with copy the company approves
// before this page goes live.
const LEADERSHIP = [
  {
    slug: "joe",
    name: "Joe Faruqui",
    role: "Founder & CEO",
    photo: "/photos/leadership/joe-faruqui.jpg",
    bio: "Founded the company and sets the sourcing and quality standards every order is held to.",
  },
  {
    slug: "ryan",
    name: "Ryan Aggergaard",
    role: "Chief Legal Officer",
    photo: "/photos/leadership/ryan-aggergaard.jpg",
    bio: "Owns contracts, export control and ITAR compliance, so a controlled order clears without a surprise at the border.",
  },
];

// By the numbers — hard proof, count up on scroll into view.
const STATS = [
  { count: 20, suffix: "+", label: "Years in business" },
  { count: 5000, format: "comma", suffix: "+", label: "Customers served" },
  { count: 15, suffix: "M+", label: "Parts supplied" },
  // No spaces around the slashes: "24 / 7 / 365" is 12 monospace characters and
  // could not fit a quarter-width cell at the figure size, so it broke onto a
  // second line. Rendered via .statText (see StatsCounter) at a size that suits a
  // word-figure rather than a numeral.
  { display: "24/7/365", label: "AOG desk always on", live: true },
];

function Icon({ name }) {
  const p = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "plane":
      return (<svg {...p}><path d="M10.5 13.5 3 15v-2l6-3.5V4a1.5 1.5 0 0 1 3 0v5.5L18 13v2l-6-1.5V19l2 1.5V22l-3.5-1L7 22v-1.5L9 19v-5.5Z" /></svg>);
    case "shield":
      return (<svg {...p}><path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6l-7-3Z" /><path d="M9 12l2 2 4-4" /></svg>);
    case "gear":
      return (<svg {...p}><path d="M2 21V9l6 3.5V9l6 3.5V5l6 3.5V21H2Z" /><path d="M6.5 21v-3M12 21v-3M17.5 21v-3" /></svg>);
    case "building":
      return (<svg {...p}><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" /></svg>);
    case "bolt":
      return (<svg {...p}><path d="M13 3 5 13h5l-1 8 8-11h-5l1-7Z" /></svg>);
    case "tools":
      return (<svg {...p}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" /></svg>);
    default:
      return null;
  }
}

export default function AboutUsPage() {
  return (
    <>
      {/* ============ 01 · HERO — shared <PageHero />, rounded photographic panel ============ */}
      <PageHero
        image="/photos/about-hero-facility.jpg"
        imageAlt="The ASAP Semiconductor facility at 1341 S. Sunkist Street, Anaheim, California, with the shipping bays open"
        imagePos="50% 64%"
        title={
          <>
            Two decades of finding
            <br />
            the parts <em>nobody stocks.</em>
          </>
        }
        lede="AFR Enterprises distributes electronic components, aviation parts and IT hardware from Anaheim, California, owned and operated by ASAP Semiconductor. AS9120B and ISO 9001:2015 certified, FAA AC 00-56B accredited, quoting inside 15 minutes around the clock."
        actions={[
          { label: "Request a quote", href: "/straightrfq/", variant: "primary" },
          { label: "Talk to the team", href: "/contact/", variant: "ghost" },
        ]}
      />

      {/* industries — who we serve, straight under the hero */}
      <section className={styles.industries} aria-label="Industries we serve">
        <div className={`container ${styles.indWrap}`}>
          <p className={styles.indLead}>Trusted across</p>
          <ul className={styles.indRow}>
            {INDUSTRIES.map((it) => (
              <li key={it.name} className={styles.indCell}>
                <span className={styles.indIcon}><Icon name={it.icon} /></span>
                <span className={styles.indName}>{it.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 02 · OUR STORY — narrative + operations figure ============
          One frame: the wide operations shot establishes the place. Copy is
          literal here — a buyer reading an About page wants to know who we are,
          where we are, who owns us and what we're certified to, not how we feel
          about parts. */}
      <section className={styles.story} aria-labelledby="story-title">
        <div className={`container ${styles.storyGrid}`}>
          <figure className={`${styles.storyFigure} ${styles.reveal}`}>
            <Image
              src="/photos/about-story.jpg"
              alt="An AFR Enterprises operator moving stock through the parts warehouse in Anaheim"
              fill
              sizes="(max-width: 900px) 100vw, 34vw"
              className={styles.storyImg}
            />
          </figure>
          <div className={`${styles.storyBody} ${styles.reveal}`}>
            <p className="eyebrow">Who we are</p>
            <h2 className={styles.blockTitle} id="story-title">
              A distributor for the
              <br />
              part that&apos;s hard to close.
            </h2>
            <p className={styles.storyLede}>
              We distribute electronic components, aviation parts and IT hardware out of Anaheim,
              California. ASAP Semiconductor owns and runs us.
            </p>
            <p className={styles.storyText}>
              Buyers come to us for the lines that are hard to close. Semiconductors that went
              end-of-life years ago. Long-lead avionics. Connectors nobody makes anymore. NSN
              hardware under CAGE code 6RE77. We stock what we can and source the rest through
              franchised distributors and manufacturers we have vetted ourselves. We don&apos;t buy
              from China.
            </p>
            <p className={styles.storyText}>
              Send a part number and a quantity, and you get a real quote with a real lead time
              inside 15 minutes. One representative owns it from quote to shipment, so you never
              explain yourself twice.
            </p>
            <p className={styles.storyText}>
              We&apos;re AS9120B and ISO 9001:2015 certified, FAA AC 00-56B accredited, AS6081
              certified for counterfeit avoidance, ANSI/ESD S20.20 certified, NIST 800-171 compliant
              and ITAR registered. Every order ships with paperwork that traces it back to an
              approved source. Ask and we&apos;ll send the certificates before you buy.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 03 · COMMITMENT — dark statement beat, word-ignition on scroll ============ */}
      <section className={styles.mission} aria-labelledby="mission-title">
        {/* The band was flat black. It now carries the bin-located racking behind
            it — held right down so the statement stays the subject and the
            charcoal ghost words still read against it. */}
        <Image
          src="/photos/commitment-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className={styles.missionPhoto}
        />
        <span className={styles.missionScrim} aria-hidden="true" />
        <span className={styles.missionField} aria-hidden="true" />
        <div className={`container ${styles.missionInner}`}>
          <p className={`eyebrow ${styles.reveal}`} style={{ color: "rgba(255,255,255,0.6)" }}>
            Our commitment
          </p>

          <h2 className={styles.missionTitle} id="mission-title">
            {COMMITMENT_LEAD.map((w, i) => (
              <span key={`l${i}`} className={styles.word} style={{ "--i": i }}>
                {w}{" "}
              </span>
            ))}
            {COMMITMENT_TAIL.map((w, i) => (
              <span
                key={`t${i}`}
                className={`${styles.word} ${styles.wordTail}`}
                style={{ "--i": COMMITMENT_LEAD.length + i }}
              >
                {w}{" "}
              </span>
            ))}
          </h2>

          <div className={`${styles.missionFoot} ${styles.reveal}`}>
            <span className={styles.missionFootLabel}>And when it slips</span>
            <p className={styles.missionSub}>
              If a confirmed date is going to move, your representative calls you before it passes,
              not after. You should never learn it from a tracking page.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 04 · VALUES — 4-across airy band, hairline dividers ============ */}
      <section className={styles.values} aria-labelledby="values-title">
        <div className="container">
          <div className={`${styles.secHead} ${styles.reveal}`}>
            <p className="eyebrow">How we work</p>
            <h2 className={styles.blockTitle} id="values-title">Four things we commit to in writing.</h2>
          </div>
          {/* .reveal moves from the row onto each cell so the values are ruled in
              one at a time, left to right (see the "ruled in" block in the CSS). */}
          <ul className={styles.valueRow}>
            {VALUES.map((v) => (
              <li key={v.n} className={`${styles.valueCell} ${styles.reveal}`}>
                <figure className={styles.valueFigure}>
                  <Image
                    src={v.img}
                    alt={v.alt}
                    fill
                    sizes="(max-width: 620px) 100vw, (max-width: 1100px) 46vw, 23vw"
                    className={styles.valueImg}
                    style={{ objectPosition: v.pos }}
                  />
                </figure>
                <span className={styles.valueNum}>{v.n}</span>
                <h3 className={styles.valueName}>{v.name}</h3>
                <p className={styles.valueLine}>{v.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 05 · WHAT SETS US APART — staircase claims, photo on demand ====
          At rest: display type on flush-aligned hairline rows, nothing else —
          which is what the rest of this page sounds like. On hover/focus a wide
          photographic strip wipes open from the claim, so the section only becomes
          pictorial when you engage it. Deliberately shares no material with its
          neighbours (a 4-across photo grid above, mono numerals on dark below). */}
      <section className={styles.edge} aria-labelledby="edge-title">
        <div className="container">
          <div className={styles.edgeHead}>
            <div className={styles.reveal}>
              <p className="eyebrow">Why buyers stay</p>
              <h2 className={styles.blockTitle} id="edge-title">
                What we can get
                <br />
                that others can&apos;t.
              </h2>
            </div>
            {/* Offset and dropped — the header reads as two related weights, not a
                centred stack. */}
            <p className={`${styles.edgeLede} ${styles.reveal}`}>
              Any distributor can fill a line that&apos;s in stock. The repeat business comes from
              the part number that went out of production eleven years ago.
            </p>
          </div>

          <ol className={styles.edgeRows}>
            {EDGE.map((e) => (
              <li key={e.n} className={`${styles.edgeRow} ${styles.reveal}`}>
                {/* Index and claim in one column so the claim sits flush with the
                    section heading instead of being indented by a number gutter. */}
                <div className={styles.edgeBody}>
                  <span className={styles.edgeNum}>{e.n}</span>
                  <h3 className={styles.edgeClaim}>
                    <span className={styles.edgeClaimText}>{e.claim}</span>
                  </h3>
                </div>

                {/* Strip and its caption, stacked, in the column that lines up with
                    the section lede above.
                    The rounding lives on the figure (border-radius + overflow) and the
                    wipe on an inner layer, so the clip-path stays a plain inset() with
                    no var() in it — a single undefined token inside inset() would
                    invalidate the whole clip and leave the strip permanently open. */}
                <div className={styles.edgeAside}>
                  <figure className={styles.edgeMedia} aria-hidden="true">
                    <span className={styles.edgeMediaClip}>
                      <Image
                        src={e.img}
                        alt=""
                        fill
                        sizes="440px"
                        className={styles.edgeImg}
                      />
                    </span>
                  </figure>
                  <p className={styles.edgeNote}>{e.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 06 · BY THE NUMBERS — dark stats band (count-up) ============ */}
      <section className={styles.stats} aria-labelledby="stats-title">
        <h2 className="visually-hidden" id="stats-title">AFR Enterprises by the numbers</h2>
        {/* The figures now sit over the people and the racking they describe,
            held back far enough that the numerals stay the brightest thing here. */}
        <Image
          src="/photos/stats-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className={styles.statsPhoto}
        />
        <span className={styles.statsScrim} aria-hidden="true" />
        <StatsCounter stats={STATS} />
      </section>

      {/* ============ 07 · LEADERSHIP — featured-portrait showcase ============ */}
      <section className={styles.leaders} aria-labelledby="leaders-title">
        <div className="container">
          <div className={`${styles.secHead} ${styles.reveal}`}>
            <p className="eyebrow">Leadership</p>
            <h2 className={styles.blockTitle} id="leaders-title">Who is accountable here.</h2>
            <p className={styles.blockLede}>
              If something goes wrong on your order, these are the people the standard comes back
              to. Both are named, and so is the representative who handles your account.
            </p>
          </div>
          <LeadershipShowcase people={LEADERSHIP} />
        </div>
      </section>

      {/* ============ 08 · CLOSE — shared sitewide final CTA ============ */}
      <FinalCta />
    </>
  );
}
