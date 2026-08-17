import NsnLeaf, { formatNsn } from "@/components/NsnLeaf/NsnLeaf";
import NsnIndexPage from "@/components/NsnIndexPage/NsnIndexPage";

const PAGE_RE = /^page-(\d+)$/;

export async function generateMetadata({ params }) {
  const m = PAGE_RE.exec(params.nsn);
  if (m) {
    return {
      title: `NSN Parts Catalog — Group ${m[1]} | AFR Enterprises`,
      description: `National Stock Numbers beginning with ${m[1]}, with item names and approved manufacturers. Instant RFQ on every line.`,
    };
  }
  const dashed = formatNsn(params.nsn);
  return {
    title: `NSN ${dashed} Parts & Part Numbers | AFR Enterprises`,
    description: `Part numbers, approved manufacturers and MIL-STD characteristic data for National Stock Number ${dashed}. CAGE code 6RE77, AS9120B certified. Quote in 15 minutes.`,
  };
}

export default function Page({ params }) {
  const m = PAGE_RE.exec(params.nsn);
  if (m) return <NsnIndexPage kind="nsn" group={m[1]} />;
  return <NsnLeaf kind="nsn" id={params.nsn} />;
}
