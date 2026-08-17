import { notFound, redirect } from "next/navigation";
import Page1, { metadata as page1Metadata } from "../page";

// Legacy pagination URLs (/aircraft-maintenance-tooling/page-{N}/). The listing data is a fixed shell, so
// deeper pages show the same catalog rather than 404 — page 1 stays canonical.
const PAGE_RE = /^page-(\d+)$/;

export async function generateMetadata({ params }) {
  const m = PAGE_RE.exec(params.page);
  if (!m) return {};
  return {
    ...page1Metadata,
    title: `${page1Metadata.title} — Page ${m[1]}`,
    alternates: { canonical: "/aircraft-maintenance-tooling/" },
    robots: { index: false, follow: true },
  };
}

export default function PaginatedPage({ params }) {
  const m = PAGE_RE.exec(params.page);
  if (!m) notFound();
  if (m[1] === "1") redirect("/aircraft-maintenance-tooling/");
  return <Page1 />;
}
