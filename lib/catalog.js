// Deterministic catalog data.
//
// AFR's real inventory lives in a back-office system this front end has no access
// to. Every table-driven page (category listings, manufacturer detail, NSN leaves,
// RFQ pages) therefore derives its rows from the URL slug via a seeded PRNG: the
// same slug always produces the same manufacturers, part numbers and quantities,
// so pages are stable across builds, deep links stay valid, and nothing flickers
// between server and client render.
//
// When the live parts feed is wired up, replace the readers at the bottom of this
// file (categoryPage, manufacturerPage, …) and every template keeps working.

/* ---------------------------------------------------------------- seeded RNG */

// FNV-1a — small, fast, good enough spread for picking list items.
function hash(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// mulberry32: one seed in, a repeatable stream of floats out.
function rng(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeRandom(seedStr) {
  const next = rng(hash(seedStr));
  return {
    next,
    int: (min, max) => min + Math.floor(next() * (max - min + 1)),
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    // Distinct sample, order preserved-ish; never returns more than the pool holds.
    sample(arr, n) {
      const pool = [...arr];
      const out = [];
      const take = Math.min(n, pool.length);
      for (let i = 0; i < take; i++) out.push(...pool.splice(Math.floor(next() * pool.length), 1));
      return out;
    },
  };
}

/* -------------------------------------------------------------- slug helpers */

const MINOR = new Set(["and", "or", "of", "to", "for", "the", "in", "on", "with", "a", "an"]);
// Industry initialisms that must stay upper-case in a title.
const ACRONYMS = new Set([
  "ic", "ics", "adc", "adcs", "dac", "dacs", "esd", "tvs", "rf", "led", "leds", "lcd", "pcb",
  "usb", "hdmi", "bnc", "smd", "smt", "io", "ac", "dc", "emi", "rfi", "nsn", "niin", "cage",
  "faa", "oem", "mro", "aog", "gps", "vhf", "uhf", "nic", "nics", "voip", "cpu", "gpu", "ram",
  "ssd", "hdd", "kvm", "poe", "sim", "ffc", "fpc", "ptc", "ntc", "mems", "asic", "fpga", "eeprom",
]);

export function titleize(slug = "") {
  return String(slug)
    .split("-")
    .filter(Boolean)
    .map((w, i) => {
      if (ACRONYMS.has(w)) return w.toUpperCase();
      if (i > 0 && MINOR.has(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

export function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* --------------------------------------------------------------- vendor pool */

// A working pool of real aerospace / electronics names. Which of these a page
// shows is decided by its slug, so a given category always lists the same set.
const MFR_POOL = [
  "Honeywell Aerospace", "Parker Hannifin Corp", "TE Connectivity", "Amphenol Corp",
  "Eaton Corp", "Collins Aerospace", "Safran Electronics", "Meggitt Aerospace",
  "Curtiss Wright Corp", "Moog Inc", "Crouzet Corp", "Grayhill Inc",
  "Omron Electronics Inc", "Phoenix Contact Inc", "Panasonic Electric Works", "Crydom",
  "Weidmuller", "Vishay Intertechnology", "Bourns Inc", "Littelfuse Inc",
  "Murata Electronics", "KEMET Corp", "AVX Corp", "Molex LLC",
  "Harwin Plc", "Souriau Sunbank", "ITT Cannon", "Glenair Inc",
  "Texas Instruments", "Analog Devices Inc", "Microchip Technology", "Renesas Electronics",
  "NXP Semiconductors", "Infineon Technologies", "ON Semiconductor", "STMicroelectronics",
  "Ducommun Inc", "Heico Corp", "Transdigm Group", "Woodward Inc",
  "Kollsman Instrument Corp", "Edal Industries Inc", "Plessey Semiconductors", "Elmwood Sensors Inc",
  "Goodrich Corp", "Sensata Technologies", "Ametek Inc", "Esterline Technologies",
];

// Condition / status strings that appear in the QTY and description columns.
const CONDITIONS = ["Factory New", "New Surplus", "Overhauled", "New & Original", "Serviceable"];

/* ------------------------------------------------------- part-number shaping */

const ALPHA = "ABCDEFGHJKLMNPRSTUVWXYZ";
const DIGITS = "0123456789";

// Real part numbers cluster into a handful of shapes; cycling through them keeps
// a table from looking like one regex repeated 90 times.
function partNumber(r) {
  const a = () => ALPHA[Math.floor(r.next() * ALPHA.length)];
  const d = () => DIGITS[Math.floor(r.next() * DIGITS.length)];
  const block = (n, fn) => Array.from({ length: n }, fn).join("");

  switch (r.int(0, 6)) {
    case 0: return `${block(2, a)}${block(4, d)}-${block(3, d)}`;
    case 1: return `${block(3, d)}-${block(4, d)}-${block(2, d)}`;
    case 2: return `${a()}${block(5, d)}${a()}`;
    case 3: return `${block(2, a)}-${block(3, d)}${a()}${block(2, d)}`;
    case 4: return `${block(4, d)}${a()}${block(3, d)}`;
    case 5: return `${a()}${block(2, d)}${a()}${block(4, d)}-${block(2, d)}`;
    default: return `${block(6, d)}-${block(3, a)}`;
  }
}

/* ------------------------------------------------------------ page factories */

/** Manufacturers credited on a page — deterministic per seed. */
export function manufacturersFor(seed, count = 7) {
  return makeRandom(`mfr:${seed}`).sample(MFR_POOL, count);
}

/**
 * Rows for a category listing: the part type is fixed, so the table names the
 * manufacturer (see WEBSITE-STUDY.md §4.3).
 */
export function categoryParts(family, category, count = 90) {
  const r = makeRandom(`cat:${family}/${category}`);
  const mfrs = manufacturersFor(`${family}/${category}`, r.int(6, 9));
  const name = titleize(category);

  return Array.from({ length: count }, () => {
    const mfr = r.pick(mfrs);
    const part = partNumber(r);
    return {
      part,
      mfr,
      // The legacy table prints "NA" for most descriptions; keep that honest
      // rather than inventing specs we can't stand behind.
      desc: r.next() < 0.72 ? "NA" : `${name} — ${r.pick(CONDITIONS)}`,
      qty: "Avl",
      href: `/rfq/${slugify(mfr)}/${slugify(part)}/`,
    };
  });
}

/**
 * Rows for a manufacturer detail page: the manufacturer is fixed, so the table
 * names the part type instead (§4.5).
 */
export function manufacturerParts(slug, count = 60) {
  const r = makeRandom(`mfrparts:${slug}`);
  const types = r.sample(PART_TYPE_POOL, r.int(5, 9));

  return Array.from({ length: count }, () => {
    const part = partNumber(r);
    return {
      part,
      type: r.next() < 0.4 ? "NA" : r.pick(types),
      desc: r.next() < 0.72 ? "NA" : r.pick(CONDITIONS),
      qty: "Avl",
      href: `/rfq/${slug}/${slugify(part)}/`,
    };
  });
}

const PART_TYPE_POOL = [
  "Connector", "Relay", "Capacitor", "Resistor", "Circuit Breaker", "Switch",
  "Sensor", "Transformer", "Filter", "Bearing", "Valve", "Actuator",
  "Wire Harness", "Terminal Block", "Fastener", "Gasket", "Indicator Light",
  "Pressure Switch", "Temperature Sensor", "Power Supply", "Amplifier", "Oscillator",
];

/** Item names used by the NSN templates. */
const NSN_ITEM_POOL = [
  "Electrical Connector", "Circuit Card Assembly", "Relay Assembly", "Bearing Ball Annular",
  "Retaining Ring", "Valve Check", "Switch Toggle", "Resistor Fixed Film",
  "Capacitor Fixed Ceramic", "Transformer Power", "Gasket Metallic", "Bolt Machine",
  "Panel Indicator", "Cable Assembly Special", "Filter Element Fluid", "Actuator Electromechanical",
];

/** Rows for an NSN-flavoured table (part · NSN · item name · manufacturer). */
export function nsnParts(seed, count = 45) {
  const r = makeRandom(`nsn:${seed}`);
  const mfrs = manufacturersFor(seed, r.int(5, 8));

  return Array.from({ length: count }, () => {
    const part = partNumber(r);
    const mfr = r.pick(mfrs);
    const nsn = `${r.int(1000, 9999)}-${r.int(10, 99)}-${r.int(100, 999)}-${r.int(1000, 9999)}`;
    return {
      part,
      nsn,
      nsnFlat: nsn.replace(/-/g, ""),
      item: r.pick(NSN_ITEM_POOL),
      mfr,
      qty: "Avl",
      href: `/nsn/rfq/${slugify(mfr)}/${nsn.replace(/-/g, "")}/${slugify(part)}/`,
    };
  });
}

/**
 * MIL-STD characteristic rows (MRC · criteria · characteristic). This structured
 * attribute data is the NSN leaf template's differentiator (§4.9).
 */
const CHARACTERISTICS = [
  ["ABHP", "Overall Length", (r) => `${(r.int(500, 9000) / 1000).toFixed(3)} inches`],
  ["ABKW", "Overall Width", (r) => `${(r.int(250, 4000) / 1000).toFixed(3)} inches`],
  ["ABMK", "Material", (r) => r.pick(["Aluminum alloy", "Stainless steel", "Brass", "Nylon", "Beryllium copper"])],
  ["AAGR", "Surface Treatment", (r) => r.pick(["Anodize", "Cadmium plate", "Passivate", "Electroless nickel"])],
  ["ACYY", "Thread Size", (r) => r.pick(["0.190-32 UNF", "0.250-28 UNF", "0.312-24 UNF", "0.375-24 UNF"])],
  ["AXGZ", "Contact Quantity", (r) => `${r.int(2, 64)}`],
  ["AGAV", "Operating Voltage", (r) => `${r.pick([5, 12, 24, 28, 115, 230])} volts`],
  ["ADAV", "Temperature Rating", (r) => `${r.int(85, 200)} degrees celsius`],
  ["AEQY", "End Item Identification", (r) => r.pick(["Aircraft", "Ground support equipment", "Shipboard", "Missile system"])],
];

export function nsnCharacteristics(seed) {
  const r = makeRandom(`chars:${seed}`);
  return r.sample(CHARACTERISTICS, r.int(5, 8)).map(([mrc, criteria, fn]) => ({
    mrc,
    criteria,
    value: fn(r).toString().toUpperCase(),
  }));
}

/** A stable "N results" style count for pagination captions. */
export function pageCount(seed, min = 3, max = 240) {
  return makeRandom(`pages:${seed}`).int(min, max);
}

/** Related slugs for "you may also need" style blocks. */
export function relatedSlugs(seed, pool, count = 6) {
  return makeRandom(`rel:${seed}`).sample(pool.filter((p) => p !== seed), count);
}

export { MFR_POOL, CONDITIONS };
