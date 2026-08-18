// Search intent — one rule for "can we answer this query, or is it a sourcing
// request?", shared by the header search box (client) and the /partno-search
// results page (server) so both entry points behave identically.
//
// The site's job is to quote parts, so anything that reads like a part
// identifier (or names something in the catalog) goes to the results page.
// A query we can't place — gibberish, a random word, a name we don't index —
// is not a dead end: it goes straight to the RFQ form with the term carried
// over, which is what the visitor wanted anyway.

import { MFR_POOL, PART_TYPE_POOL, NSN_ITEM_POOL } from "@/lib/catalog";
import { TOP_MANUFACTURERS, POPULAR_PARTS, PART_TYPES } from "@/components/Header/searchData";

// Industry vocabulary beyond the catalog pools — words a real visitor types when
// they're browsing rather than looking up a number.
const INDUSTRY_WORDS = [
  "aircraft", "aviation", "avionics", "aerospace", "engine", "airframe", "baffle",
  "tooling", "tool", "test", "equipment", "electronic", "electronics", "electrical",
  "hardware", "component", "components", "part", "parts", "spare", "spares",
  "nsn", "niin", "cage", "fsc", "obsolete", "surplus", "overhauled", "serviceable",
  "connector", "capacitor", "resistor", "relay", "switch", "breaker", "sensor",
  "transformer", "filter", "bearing", "valve", "actuator", "harness", "terminal",
  "fastener", "gasket", "indicator", "light", "lamp", "led", "power", "supply",
  "amplifier", "oscillator", "diode", "transistor", "fuse", "seal", "bushing",
  "bracket", "panel", "pump", "motor", "generator", "starter", "hose", "tube",
  "wire", "cable", "screw", "bolt", "nut", "washer", "ring", "kit", "assembly",
  "board", "module", "unit", "controller", "converter", "regulator", "gauge",
  "bulkhead", "hydraulic", "pneumatic", "landing", "gear", "brake", "wheel",
  "seat", "interior", "cargo", "door", "window", "antenna", "radio", "radar",
  "navigation", "display", "instrument", "battery", "charger", "circuit",
];

// Every word we recognise, lower-cased and singularised.
const VOCAB = (() => {
  const set = new Set();
  const add = (str) => {
    String(str)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 1)
      .forEach((w) => set.add(singular(w)));
  };
  MFR_POOL.forEach(add);
  PART_TYPE_POOL.forEach(add);
  NSN_ITEM_POOL.forEach(add);
  TOP_MANUFACTURERS.forEach((m) => add(m.name));
  PART_TYPES.forEach((t) => add(t.name));
  INDUSTRY_WORDS.forEach(add);
  return set;
})();

// Full names, for "does the query name one of these outright?" checks.
const KNOWN_NAMES = [
  ...MFR_POOL,
  ...TOP_MANUFACTURERS.map((m) => m.name),
  ...PART_TYPES.map((t) => t.name),
  ...PART_TYPE_POOL,
  ...NSN_ITEM_POOL,
].map((n) => n.toLowerCase());

const KNOWN_PARTS = POPULAR_PARTS.map((p) => p.part.toLowerCase());

// Corporate suffixes carry no signal — "Foo Inc" shouldn't pass on "inc" alone.
const NOISE = new Set(["inc", "corp", "llc", "ltd", "plc", "co", "the", "and", "of", "for"]);

function singular(word) {
  return word.length > 3 && word.endsWith("s") && !word.endsWith("ss") ? word.slice(0, -1) : word;
}

function normalize(query) {
  return String(query || "").trim().replace(/\s+/g, " ");
}

/**
 * Does the query look like a part identifier (part number, NSN, NIIN, CAGE)?
 * These always go to the results page — quoting numbers is the whole point.
 */
export function looksLikeIdentifier(query) {
  const q = normalize(query);
  if (!q) return false;
  const bare = q.replace(/[^a-z0-9]/gi, "");
  if (bare.length < 3) return false;
  if (/^\d{9}$/.test(bare) || /^\d{13}$/.test(bare)) return true; // NIIN / NSN
  if (/^[a-z0-9]{5}$/i.test(bare) && /\d/.test(bare)) return true; // CAGE code
  if (/^\d{5,}$/.test(bare)) return true; // long numeric run
  // Mixed letters + digits, or digits with separators: MS21042L3, 3291186-6, ADTS-403.
  return /\d/.test(bare) && bare.length >= 4;
}

/**
 * Is this a query we can show results for? True for part identifiers and for
 * anything naming a manufacturer, part type or catalog item we index.
 * False for gibberish and for terms we have no index behind.
 */
export function isResolvableSearch(query) {
  const q = normalize(query);
  if (!q) return true; // blank — the results page shows its own empty state
  const lower = q.toLowerCase();

  if (KNOWN_PARTS.some((p) => p === lower || p.includes(lower) || lower.includes(p))) return true;
  if (looksLikeIdentifier(q)) return true;

  // Names it outright, either direction ("honeywell" → Honeywell Aerospace).
  if (KNOWN_NAMES.some((n) => n === lower || n.includes(lower) || lower.includes(n))) return true;

  // Otherwise every meaningful word has to be vocabulary we recognise, so
  // "circuit breaker" resolves and "asdkjh breaker" does not.
  const words = lower.split(/[^a-z0-9]+/).filter(Boolean);
  const meaningful = words.map(singular).filter((w) => w.length > 1 && !NOISE.has(w));
  if (meaningful.length === 0) return false;
  return meaningful.every((w) => VOCAB.has(w));
}

/** Where an unresolvable query goes: the RFQ form, with the term carried over. */
export function rfqHrefForQuery(query) {
  const q = normalize(query);
  return `/straightrfq/?partNumber=${encodeURIComponent(q)}&from=search`;
}
