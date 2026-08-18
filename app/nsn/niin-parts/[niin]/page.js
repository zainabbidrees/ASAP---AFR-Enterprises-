import NsnLeaf, { formatNiin } from "@/components/NsnLeaf/NsnLeaf";
import NsnIndexPage from "@/components/NsnIndexPage/NsnIndexPage";

const PAGE_RE = /^page-(\d+)$/;

export async function generateMetadata({ params }) {
  const m = PAGE_RE.exec(params.niin);
  if (m) {
    return {
      title: `NIIN Parts Catalog: Group ${m[1]} | AFR Enterprises`,
      description: `National Item Identification Numbers in group ${m[1]}. Factory New, New Surplus and Overhauled conditions quoted explicitly.`,
    };
  }
  const dashed = formatNiin(params.niin);
  return {
    title: `NIIN ${dashed} Parts & Part Numbers | AFR Enterprises`,
    description: `Part numbers and approved manufacturers for NIIN ${dashed}. AS9120B certified distributor, CAGE code 6RE77. Instant RFQ.`,
  };
}

export default function Page({ params }) {
  const m = PAGE_RE.exec(params.niin);
  if (m) return <NsnIndexPage kind="niin" group={m[1]} />;
  return <NsnLeaf kind="niin" id={params.niin} />;
}
