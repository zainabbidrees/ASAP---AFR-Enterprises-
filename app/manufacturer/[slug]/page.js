import ManufacturerRoute, { manufacturerMetadata, manufacturerParams } from "@/components/ManufacturerRoute/ManufacturerRoute";

export function generateStaticParams() {
  return manufacturerParams();
}

export async function generateMetadata({ params }) {
  return manufacturerMetadata(params.slug, 1);
}

export default function Page({ params }) {
  return <ManufacturerRoute slug={params.slug} />;
}
