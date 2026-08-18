import styles from "./Testimonials.module.css";

// Real ASAP Semiconductor 5★ Google reviews (verbatim from the customer's Google Business page).
const REVIEWS = [
  { text: "Nate Pratt was extremely professional and helpful in assisting me with a part I was looking for. He didn't have the part in stock, but he went above and beyond to help me locate suppliers that did. His assistance was invaluable and very professional.", name: "Tammie Echols", tag: "Google review · 9 months ago" },
  { text: "Parts Rep (Mitchell) went beyond the call of duty to help ULC Party Bus company with an AC motherboard problem, taking the time to listen intently, following up with questions, and ending with thorough guidance to resolve my problem.", name: "Jose Cruz", tag: "Google review · 5 months ago" },
  { text: "My order was below their minimum quantity, but Mitchell Hinojosa still took the time to find an alternate vendor and pointed me in the right direction without expecting anything in return. Exceptional service like this is rare, and I'm very grateful.", name: "R A", tag: "Google review · a year ago" },
  { text: "Called in looking to source a part and Nate Pratt helped me out. I don't usually bother to leave reviews for something like this, but Nate was just too helpful not to. Highly recommend working with this company and Nate especially.", name: "Nicholas Dillenburg", tag: "Google review · a year ago" },
  { text: "I enjoy working with ASAP Semiconductor. Nate Pratt is very professional and a great business partner. He provides great feedback and likes to buy.", name: "paul dockus", tag: "Google review · 11 months ago" },
  { text: "Nate has been very helpful with my parts requests whether he has them in stock or not, even telling me where to buy a part when he didn't have it. He's clearly the best contact at his company and I would buy from him anytime.", name: "Glenn Deckman", tag: "Google review · 2 years ago" },
  { text: "Each and every time, Nate goes above and beyond to make sure everything goes well with each order. We've purchased a certain part multiple times and the parts are 100% good. Great quality and delivery, and he'll hold a quote valid for up to 6 months.", name: "John Gomes", tag: "Google review · 4 years ago" },
  { text: "I had to order a part that needed real urgency and Nathan Pratt jumped into action. I was able to order it and ship across the country from California to Maine in less than 24 hours. Now that's service!!! Highly recommend dealing with him.", name: "Brian Storace", tag: "Local Guide · Google review" },
  { text: "I've been using ASAP, rep Steven Pratt, when I need obscure parts. He's professional in all respects, staying in contact with updates on searches and alternate parts. Their ability to find all types of parts is great.", name: "Charles Largay", tag: "Google review · 5 years ago" },
];

const COL_A = REVIEWS.filter((_, idx) => idx % 2 === 0);
const COL_B = REVIEWS.filter((_, idx) => idx % 2 === 1);
const Stars = () => <span className={styles.stars} aria-hidden="true">★★★★★</span>;

function Card({ r }) {
  return (
    <figure className={styles.card}>
      <Stars />
      <blockquote className={styles.quote}>{r.text}</blockquote>
      <figcaption className={styles.attr}>
        <span className={styles.avatar} aria-hidden="true">{r.name.trim().charAt(0)}</span>
        <span className={styles.who}>
          <strong>{r.name}</strong>
          <small>{r.tag}</small>
        </span>
      </figcaption>
    </figure>
  );
}

// One column: the list is duplicated so the vertical marquee loops seamlessly.
function Column({ items, className }) {
  return (
    <div className={`${styles.col} ${className}`}>
      {[...items, ...items].map((r, idx) => (
        <Card key={r.name + idx} r={r} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className={styles.section} aria-labelledby="proof-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Testimonials</p>
          <h2 className={styles.title} id="proof-title">What customers say</h2>
          <div className={styles.rating}>
            <span className={styles.score}>5.0</span>
            <span className={styles.ratingBody}>
              <Stars />
              <span className={styles.ratingNote}>Rated 5.0 across verified Google reviews</span>
            </span>
          </div>
          <p className={styles.lead}>
            Real, verbatim reviews from the buyers and MROs we source for, the same people
            who come back when the next part gets hard to find.
          </p>
        </div>

        <div className={styles.marquee} aria-label="Customer reviews">
          <Column items={COL_A} className={styles.up} />
          <Column items={COL_B} className={styles.down} />
        </div>
      </div>
    </section>
  );
}
