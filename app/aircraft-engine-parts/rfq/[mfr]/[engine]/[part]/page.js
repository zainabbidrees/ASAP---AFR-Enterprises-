import ToolingRfq from "@/components/RfqDetail/ToolingRfq";

export const CONFIG = {
  section: "Aircraft Engine Parts",
  href: "/aircraft-engine-parts/",
  midLabel: "Engine",
};

export async function generateMetadata({ params }) {
  return ToolingRfq.metadata({ ...CONFIG, ...params, mid: params.engine });
}

export default function Page({ params }) {
  return <ToolingRfq {...CONFIG} mfr={params.mfr} mid={params.engine} part={params.part} />;
}
