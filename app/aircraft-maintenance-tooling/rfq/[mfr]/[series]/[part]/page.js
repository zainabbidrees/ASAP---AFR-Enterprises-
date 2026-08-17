import ToolingRfq from "@/components/RfqDetail/ToolingRfq";

const CONFIG = {
  section: "Aircraft Maintenance Tooling",
  href: "/aircraft-maintenance-tooling/",
  midLabel: "Aircraft series",
};

export async function generateMetadata({ params }) {
  return ToolingRfq.metadata({ ...CONFIG, ...params, mid: params.series });
}

export default function Page({ params }) {
  return <ToolingRfq {...CONFIG} mfr={params.mfr} mid={params.series} part={params.part} />;
}
