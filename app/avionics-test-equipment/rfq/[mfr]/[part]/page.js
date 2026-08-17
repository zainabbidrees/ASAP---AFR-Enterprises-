import ToolingRfq from "@/components/RfqDetail/ToolingRfq";

const CONFIG = {
  section: "Avionics Test Equipment",
  href: "/avionics-test-equipment/",
};

export async function generateMetadata({ params }) {
  return ToolingRfq.metadata({ ...CONFIG, ...params });
}

export default function Page({ params }) {
  return <ToolingRfq {...CONFIG} mfr={params.mfr} part={params.part} />;
}
