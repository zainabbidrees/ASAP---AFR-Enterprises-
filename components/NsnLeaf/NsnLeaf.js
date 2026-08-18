import CatalogListing from "@/components/CatalogListing/CatalogListing";
import {
  manufacturersFor,
  nsnCharacteristics,
  nsnParts,
  pageCount,
  slugify,
  titleize,
} from "@/lib/catalog";
import { CTA, nsnIntro } from "@/lib/copy";

// The four NSN leaf templates (§4.9). They differ only in which identifier is
// fixed and which columns that leaves free, so one component covers all of them.
//
//   kind "nsn"  — /nsn/nsn-parts/{13-digit}/   richest: adds the MIL-STD grid
//   kind "niin" — /nsn/niin-parts/{9-digit}/
//   kind "fsc"  — /nsn/fscs/{code}-{slug}/
//   kind "cage" — /nsn/cage-codes/{code}/      adds the CAGE details box
export default function NsnLeaf({ kind, id, slug }) {
  const seed = `${kind}:${id}`;
  const rows = nsnParts(seed, kind === "cage" ? 40 : 45);
  const total = pageCount(seed, 2, kind === "fsc" ? 3147 : 40);
  const item = rows[0]?.item || "Component";

  const config = {
    nsn: () => nsnConfig(id, rows, item, seed),
    niin: () => niinConfig(id, rows, item),
    fsc: () => fscConfig(id, slug, rows),
    cage: () => cageConfig(id, rows, seed),
  }[kind]();

  return (
    <CatalogListing
      {...config}
      columns={config.columns}
      rows={rows.map((r) => ({
        ...r,
        nsnHref: `/nsn/nsn-parts/${r.nsnFlat}/`,
        mfrHref: `/nsn/manufacturer/${slugify(r.mfr)}/`,
      }))}
      pager={{
        displaying: `Displaying Page: 1 of ${total}`,
        base: config.pageBase,
        total,
      }}
      cta={CTA}
    />
  );
}

const PART_COL = { key: "part", header: "Part No.", kind: "part" };
const ITEM_COL = { key: "item", header: "Item Name" };
const MFR_COL = { key: "mfr", header: "Manufacturer", kind: "link", hrefKey: "mfrHref" };
const NSN_COL = { key: "nsn", header: "NSN", kind: "link", hrefKey: "nsnHref" };
const QTY_COL = { key: "qty", header: "QTY" };
const RFQ_COL = { key: "rfq", header: "RFQ / Cart", kind: "rfq" };

function nsnConfig(id, rows, item, seed) {
  const dashed = formatNsn(id);
  const chars = nsnCharacteristics(seed);
  const mfrs = [...new Set(rows.map((r) => r.mfr))].slice(0, 8);
  // Neighbouring stock numbers in the same FSC — real, navigable links.
  const related = nsnParts(`rel:${seed}`, 6).map((r) => [formatNsn(r.nsnFlat), `/nsn/nsn-parts/${r.nsnFlat}/`]);

  return {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "NSN Parts", href: "/nsn/nsn-parts/" },
      { label: dashed },
    ],
    h1: `Browse NSN ${dashed} ${item} Parts Catalog`,
    intro: nsnIntro(dashed, item),
    proseEyebrow: `About NSN ${dashed}`,
    linkList: {
      title: "Approved Manufacturers",
      note: `National Stock Number ${dashed} (${id}) is supplied by the manufacturers below.`,
      items: mfrs.map((m) => [m, `/nsn/manufacturer/${slugify(m)}/`]),
    },
    tableTitle: "Part Numbers Under This NSN",
    columns: [PART_COL, MFR_COL, ITEM_COL, QTY_COL, RFQ_COL],
    pageBase: `/nsn/nsn-parts/${id}/page-`,
    attrTable: {
      title: "Characteristics",
      intro:
        "MIL-STD attribute data recorded against this stock number. Where a characteristic drives fit or function, confirm it on the quote before you commit.",
      head: ["MRC", "Criteria", "Characteristic"],
      rows: chars.map((c) => [c.mrc, c.criteria, c.value]),
    },
    related: { title: "Relevant Components", items: related },
  };
}

function niinConfig(id, rows, item) {
  const dashed = formatNiin(id);
  const mfrs = [...new Set(rows.map((r) => r.mfr))].slice(0, 8);

  return {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "NIIN Parts", href: "/nsn/niin-parts/" },
      { label: dashed },
    ],
    h1: `NIIN ${dashed}: ${item} Parts`,
    intro: `National Item Identification Number ${dashed} identifies ${item.toLowerCase()} items in the federal supply system. The part numbers and approved manufacturers mapped to this NIIN are listed above. Every line is quoted in Factory New, New Surplus or Overhauled condition, stated explicitly.`,
    proseEyebrow: `About NIIN ${dashed}`,
    linkList: {
      title: "Approved Manufacturers",
      items: mfrs.map((m) => [m, `/nsn/manufacturer/${slugify(m)}/`]),
    },
    tableTitle: "Part Numbers Under This NIIN",
    columns: [PART_COL, NSN_COL, ITEM_COL, MFR_COL, QTY_COL, RFQ_COL],
    pageBase: `/nsn/niin-parts/${id}/page-`,
  };
}

function fscConfig(id, slug, rows) {
  const name = slug ? titleize(slug) : "Federal Supply Class";

  return {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Federal Supply Classes", href: "/nsn/fscs/" },
      { label: id },
    ],
    h1: `FSC ${id}: ${name}`,
    intro: `Federal Supply Class ${id} covers ${name.toLowerCase()}. AFR Enterprises stocks and sources parts across this class under CAGE code 6RE77, supplying government agencies, defense primes and MRO facilities with full traceability on every shipment.`,
    proseEyebrow: `About FSC ${id}`,
    tableTitle: `Parts in Federal Supply Class ${id}`,
    columns: [PART_COL, NSN_COL, ITEM_COL, MFR_COL, QTY_COL, RFQ_COL],
    pageBase: `/nsn/fscs/${id}${slug ? `-${slug}` : ""}/page-`,
  };
}

function cageConfig(id, rows, seed) {
  const [mfr] = manufacturersFor(seed, 1);
  const details = cageDetails(id, mfr, seed);

  return {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "CAGE Codes", href: "/nsn/cage-codes/" },
      { label: id.toUpperCase() },
    ],
    h1: `CAGE Code ${id.toUpperCase()}: ${mfr}`,
    intro: `Commercial and Government Entity code ${id.toUpperCase()} is assigned to ${mfr}. The registration details and the part numbers we hold against this entity are above. Submit an RFQ on any line for pricing, availability and condition in writing.`,
    proseEyebrow: `About CAGE ${id.toUpperCase()}`,
    tableTitle: `Parts Supplied Under CAGE ${id.toUpperCase()}`,
    columns: [PART_COL, ITEM_COL, NSN_COL, QTY_COL, RFQ_COL],
    pageBase: `/nsn/cage-codes/${id}/page-`,
    attrTable: {
      title: "CAGE Details",
      head: ["Field", "Value"],
      rows: details,
    },
  };
}

// The registration fields the legacy CAGE leaf prints.
function cageDetails(id, mfr, seed) {
  const r = nsnParts(`cage-detail:${seed}`, 1)[0];
  return [
    ["Manufacturer", mfr],
    ["CAGE Code", id.toUpperCase()],
    ["Status", "Active"],
    ["Type", "Manufacturer / Distributor"],
    ["CAO Code", `S${r.nsn.slice(0, 4)}A`],
    ["ADP Code", r.nsn.slice(5, 7)],
  ];
}

export function formatNsn(flat) {
  const d = String(flat).replace(/\D/g, "");
  if (d.length !== 13) return String(flat);
  return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 9)}-${d.slice(9)}`;
}

export function formatNiin(flat) {
  const d = String(flat).replace(/\D/g, "");
  if (d.length !== 9) return String(flat);
  return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
}
