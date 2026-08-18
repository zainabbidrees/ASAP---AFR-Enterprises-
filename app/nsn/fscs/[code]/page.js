import NsnLeaf from "@/components/NsnLeaf/NsnLeaf";
import { titleize } from "@/lib/catalog";

const PAGE_RE = /^page-(\d+)$/;

// Legacy leaf URLs are "{4-digit code}-{slug}"; split them back apart.
function split(param) {
  const m = /^(\d{4})(?:-(.+))?$/.exec(param);
  return m ? { code: m[1], slug: m[2] || "" } : { code: param, slug: "" };
}

export async function generateMetadata({ params }) {
  if (PAGE_RE.test(params.code)) {
    return { title: "Federal Supply Classes | AFR Enterprises", robots: { index: false } };
  }
  const { code, slug } = split(params.code);
  const name = slug ? titleize(slug) : "Federal Supply Class";
  return {
    title: `FSC ${code}: ${name} | NSN Parts | AFR Enterprises`,
    description: `Parts catalogued under Federal Supply Class ${code} (${name}), with National Stock Numbers, item names and approved manufacturers. Instant RFQ.`,
  };
}

export default function Page({ params }) {
  const { code, slug } = split(params.code);
  return <NsnLeaf kind="fsc" id={code} slug={slug} />;
}
