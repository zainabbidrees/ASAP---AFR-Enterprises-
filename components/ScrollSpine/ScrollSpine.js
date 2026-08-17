import styles from "./ScrollSpine.module.css";

// Decorative scroll-linked "instrument route": a hairline that draws down the
// page while a pulsing reticle glides along it, lighting each waypoint in turn.
// Pure CSS scroll-timeline — no client JS. mix-blend-mode keeps the single white
// thread legible over both light and dark sections. Hidden ≤1024px and where
// scroll-timelines / reduced-motion aren't supported.
export default function ScrollSpine({ stops = 8 }) {
  const n = Math.max(2, stops);
  return (
    <div className={styles.spine} aria-hidden="true">
      <span className={styles.fill} />
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className={styles.stop} style={{ "--pct": i / (n - 1) }} />
      ))}
      <span className={styles.head} />
    </div>
  );
}
