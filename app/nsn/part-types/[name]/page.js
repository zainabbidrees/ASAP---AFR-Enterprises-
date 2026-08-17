import NsnPartTypeRoute, { nsnPartTypeMetadata, nsnPartTypeParams } from "@/components/NsnPartTypeRoute/NsnPartTypeRoute";

export function generateStaticParams() {
  return nsnPartTypeParams();
}

export async function generateMetadata({ params }) {
  return nsnPartTypeMetadata(params.name);
}

export default function Page({ params }) {
  return <NsnPartTypeRoute slug={params.name} />;
}
