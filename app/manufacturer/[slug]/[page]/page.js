import { notFound } from "next/navigation";
import ManufacturerRoute, { manufacturerMetadata } from "@/components/ManufacturerRoute/ManufacturerRoute";

// Legacy pagination URLs: /manufacturer/{slug}/page-{N}/
const PAGE_RE = /^page-(\d+)$/;

export async function generateMetadata({ params }) {
  const n = PAGE_RE.exec(params.page);
  if (!n) return {};
  return manufacturerMetadata(params.slug, Number(n[1]));
}

export default function Page({ params }) {
  const n = PAGE_RE.exec(params.page);
  if (!n) notFound();
  return <ManufacturerRoute slug={params.slug} page={Number(n[1])} />;
}
