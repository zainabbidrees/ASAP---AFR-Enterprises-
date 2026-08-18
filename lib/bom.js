// Bill-of-materials parser. Dependency-free on purpose: buyers send whatever
// their system exports — a CSV, a tab-separated paste straight out of Excel, a
// semicolon export from an ERP, or a bare list of part numbers in an email — and
// all of it has to land in the RFQ form without anyone reformatting a file.
//
// parseBom(text) -> { rows, skipped, truncated, hadHeader, delimiter }

// The condition options offered on the RFQ form. Exported so the <select> and
// the normaliser below can't drift apart.
export const CONDITIONS = [
  "New / Factory Sealed",
  "New Surplus",
  "Overhauled · 8130-3",
  "Serviceable · Traceable",
  "Repaired / Modified",
];

export const MAX_ROWS = 250;

const DELIMITERS = ["\t", ",", ";", "|"];

// Column-name hints, matched against header cells stripped to bare letters.
const HINTS = {
  pn: ["partnumber", "partno", "part", "pn", "p/n", "nsn", "niin", "mpn", "manufacturerpartnumber", "sku", "model", "itemnumber", "partnsn"],
  qty: ["qty", "quantity", "qnty", "qtyea", "each", "ea", "count", "pieces", "pcs", "required", "reqqty"],
  condition: ["condition", "cond", "cnd", "grade", "state"],
};

// Rows an export drops in that are not parts.
const NOISE = /^(total|subtotal|grand total|sum|notes?|comments?|end of (report|list)|page \d|sheet\d?|-+|=+)$/i;

function stripKey(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9/]/g, "");
}

// One line -> cells, honouring "quoted, fields" and "" escapes.
function splitRow(line, delim) {
  if (!delim) return [line.trim()];
  const out = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; } else { quoted = false; }
      } else cur += ch;
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === delim) {
      out.push(cur); cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((c) => c.trim());
}

// Pick the delimiter that appears most consistently across the sample. A file
// with no delimiter at all (a bare list of part numbers) returns null.
function detectDelimiter(lines) {
  const sample = lines.slice(0, 12);
  let best = null;
  let bestScore = 0;
  for (const d of DELIMITERS) {
    const counts = sample.map((l) => splitRow(l, d).length - 1);
    const used = counts.filter((c) => c > 0).length;
    if (!used) continue;
    // Reward a delimiter that splits most lines into the same number of cells.
    const mode = counts.filter((c) => c > 0).sort((a, b) => a - b)[Math.floor(used / 2)];
    const consistent = counts.filter((c) => c === mode).length;
    const score = used + consistent;
    if (score > bestScore) { bestScore = score; best = d; }
  }
  return best;
}

function isNumeric(s) {
  return /^\d{1,6}$/.test(String(s).trim());
}

function looksLikePart(s) {
  const v = String(s).trim();
  return v.length >= 2 && /[a-z0-9]/i.test(v) && !NOISE.test(v);
}

export function normalizeCondition(raw) {
  const s = String(raw || "").toLowerCase();
  if (!s.trim()) return "";
  // Order matters: "new surplus" must not be caught by the bare "new" test.
  if (/surplus|\bns\b/.test(s)) return CONDITIONS[1];
  if (/overhaul|\boh\b|8130/.test(s)) return CONDITIONS[2];
  if (/repair|modif|\brp\b|\bmod\b/.test(s)) return CONDITIONS[4];
  if (/serviceabl|\bsv\b|\bsvc\b/.test(s)) return CONDITIONS[3];
  if (/factory\s*seal|\bnew\b|\bnfs\b|\bne\b|\bnib\b/.test(s)) return CONDITIONS[0];
  return "";
}

// A header row is one where a cell names a column we understand and no cell is
// a bare number (a data row that happens to start with "PART" stays data).
function readHeader(cells) {
  if (cells.some(isNumeric)) return null;
  const map = {};
  cells.forEach((cell, i) => {
    const key = stripKey(cell);
    if (!key) return;
    for (const field of ["pn", "qty", "condition"]) {
      if (map[field] !== undefined) continue;
      if (HINTS[field].some((h) => key === h || key.startsWith(h) || h.startsWith(key))) {
        map[field] = i;
      }
    }
  });
  return map.pn !== undefined || map.qty !== undefined ? map : null;
}

// No header: infer which column is which from the shape of the data.
function inferColumns(rows) {
  const width = Math.max(...rows.map((r) => r.length));
  const col = (i) => rows.map((r) => (r[i] || "").trim()).filter(Boolean);
  const map = {};

  for (let i = 0; i < width; i++) {
    const vals = col(i);
    if (!vals.length) continue;
    const allNum = vals.every(isNumeric);
    const conds = vals.filter((v) => normalizeCondition(v)).length;

    if (map.pn === undefined && !allNum && conds < vals.length / 2 && vals.every(looksLikePart)) {
      map.pn = i;
      continue;
    }
    if (map.qty === undefined && allNum) { map.qty = i; continue; }
    if (map.condition === undefined && conds >= vals.length / 2) { map.condition = i; }
  }
  if (map.pn === undefined) map.pn = 0;
  return map;
}

// Single-column input: pull a trailing or leading quantity out of the line
// ("MS21042L3 x 10", "10 ea NAS1149F0332P"). The remainder must still contain a
// letter, so a bare numeric part number is never split.
function splitLoose(value) {
  const v = value.trim();
  let m = /^(.+?)[\s,]+(?:x\s*)?(\d{1,6})\s*(?:ea|each|pcs?|pieces?|units?)?$/i.exec(v);
  if (m && /[a-z]/i.test(m[1])) return { pn: m[1].trim().replace(/[,;]$/, ""), qty: m[2] };
  m = /^(\d{1,6})\s*(?:x|ea|pcs?)\s+(.+)$/i.exec(v);
  if (m && /[a-z]/i.test(m[2])) return { pn: m[2].trim(), qty: m[1] };
  return { pn: v, qty: "" };
}

export function parseBom(text) {
  const clean = String(text || "").replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  const lines = clean.split("\n").map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return { rows: [], skipped: 0, truncated: false, hadHeader: false, delimiter: null };

  const delimiter = detectDelimiter(lines);
  let cells = lines.map((l) => splitRow(l, delimiter));

  const header = readHeader(cells[0]);
  if (header) cells = cells.slice(1);

  const map = header || (delimiter ? inferColumns(cells) : { pn: 0 });

  const rows = [];
  let skipped = 0;
  let truncated = false;

  for (const row of cells) {
    if (rows.length >= MAX_ROWS) { truncated = true; break; }

    let pn = (row[map.pn] || "").trim();
    let qty = map.qty !== undefined ? (row[map.qty] || "").trim() : "";
    const condition = map.condition !== undefined ? normalizeCondition(row[map.condition]) : "";

    // A one-column line may still carry its quantity inline.
    if (!delimiter || (row.length === 1 && !qty)) {
      const loose = splitLoose(pn);
      pn = loose.pn;
      if (!qty) qty = loose.qty;
    }

    pn = pn.replace(/^["']|["']$/g, "").trim();
    if (!looksLikePart(pn)) { skipped++; continue; }

    rows.push({
      pn,
      qty: isNumeric(qty) ? String(parseInt(qty, 10)) : "",
      condition,
    });
  }

  return { rows, skipped, truncated, hadHeader: Boolean(header), delimiter };
}
