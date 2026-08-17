import ToolingRfq from "@/components/RfqDetail/ToolingRfq";

const CONFIG = {
  section: "Aircraft Engine Baffle",
  href: "/aircraft-engine-baffle/",
};

export async function generateMetadata({ params }) {
  return ToolingRfq.metadata({ ...CONFIG, ...params });
}

export default function Page({ params }) {
  return <ToolingRfq {...CONFIG} mfr={params.mfr} part={params.part} />;
}
