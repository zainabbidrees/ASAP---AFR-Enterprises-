import NsnLeaf from "@/components/NsnLeaf/NsnLeaf";

const PAGE_RE = /^page-(\d+)$/;

export async function generateMetadata({ params }) {
  if (PAGE_RE.test(params.code)) {
    return { title: "CAGE Code Directory | AFR Enterprises", robots: { index: false } };
  }
  const code = params.code.toUpperCase();
  return {
    title: `CAGE Code ${code}: Manufacturer & Parts | AFR Enterprises`,
    description: `Registration details and available part numbers for Commercial and Government Entity code ${code}. AS9120B certified, CAGE 6RE77. Instant RFQ.`,
  };
}

export default function Page({ params }) {
  return <NsnLeaf kind="cage" id={params.code} />;
}
