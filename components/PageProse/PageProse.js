import Link from "next/link";
import styles from "./PageProse.module.css";

// The narrative block that sits BELOW the listing on every inner page.
//
// Inner pages lead with the thing people came for — the parts table, the letter
// grid, the card index — and the supporting copy follows underneath. This is the
// one place that copy is designed, so every inner page reads the same: a hairline
// rule opening the block, an eyebrow, a lead at display size, then each topic as
// its own titled section whose points render as a hairline card grid (labelled
// points) or hairline rows (plain points).
//
// Props:
//   eyebrow          – small caps kicker above the block (default "Overview")
//   title            – optional heading for the whole block
//   lead             – string/node, or an array of them → lead + body paragraphs
//   blocks           – [{ title, intro?, bullets?|items?, numbered? }]
//                      bullets accept "Label: body" strings (split into a card),
//                      plain strings/nodes (hairline rows), or {title|label, body}
//   closing          – single closing paragraph, set in a soft panel
//   cta              – { title, body, href, label } closing action panel
export default function PageProse({
  eyebrow = "Overview",
  title,
  lead,
  blocks = [],
  closing,
  cta,
}) {
  const paras = toArray(lead);
  const topics = blocks.filter((b) => b && (b.title || points(b).length > 0 || b.intro));

  if (paras.length === 0 && topics.length === 0 && !closing && !cta) return null;

  return (
    <section className={styles.prose}>
      {(eyebrow || title || paras.length > 0) && (
        <div className={styles.head}>
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          {title && <h2 className={styles.title}>{title}</h2>}
          {paras.map((p, i) => (
            <p className={i === 0 ? styles.lead : styles.body} key={i}>{p}</p>
          ))}
        </div>
      )}

      {topics.length > 0 && (
        <div className={styles.blocks}>
          {topics.map((b, i) => (
            <Topic block={b} index={i + 1} key={b.title || i} />
          ))}
        </div>
      )}

      {closing && <p className={styles.closing}>{closing}</p>}

      {cta && (
        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>{cta.title}</h2>
          {cta.body && <p className={styles.ctaBody}>{cta.body}</p>}
          {cta.href && <Link className="btn" href={cta.href}>{cta.label || "Request a Quote"}</Link>}
        </div>
      )}
    </section>
  );
}

function Topic({ block, index }) {
  const items = points(block).map(split);
  // A group whose points carry their own label reads as cards; a plain list of
  // sentences reads as hairline rows. Mixing the two looks accidental, so the
  // presence of any label decides the whole group.
  const labelled = items.some((it) => it.label);

  return (
    <div className={styles.block}>
      {block.title && (
        <div className={styles.blockHead}>
          <span className={styles.num} aria-hidden="true">{pad(index)}</span>
          <h2 className={styles.blockTitle}>{block.title}</h2>
        </div>
      )}
      {block.intro && <p className={styles.blockIntro}>{block.intro}</p>}

      {items.length > 0 && (labelled ? (
        <ul className={styles.grid}>
          {items.map((it, i) => (
            <li className={styles.cell} key={i}>
              {block.numbered && <span className={styles.cellNum}>{pad(i + 1)}</span>}
              {it.label && <span className={styles.cellLabel}>{it.label}</span>}
              <p className={styles.cellBody}>{it.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.list}>
          {items.map((it, i) => (
            <li className={styles.row} key={i}>
              <span className={styles.marker} aria-hidden="true">
                {block.numbered ? pad(i + 1) : "—"}
              </span>
              <span>{it.body}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

const points = (block) => block.items || block.bullets || [];

const toArray = (value) =>
  value == null ? [] : Array.isArray(value) ? value.filter(Boolean) : [value];

// "Hardware and Fasteners: high-grade clamps…" → label + body. The cap keeps a
// mid-sentence colon (or a URL) from being mistaken for a label.
function split(item) {
  if (item && typeof item === "object" && !item.$$typeof && (item.title || item.label)) {
    return { label: item.title || item.label, body: item.body };
  }
  if (typeof item !== "string") return { label: null, body: item };

  const idx = item.indexOf(":");
  return idx > 0 && idx < 48
    ? { label: item.slice(0, idx).trim(), body: item.slice(idx + 1).trim() }
    : { label: null, body: item };
}

const pad = (n) => String(n).padStart(2, "0");
