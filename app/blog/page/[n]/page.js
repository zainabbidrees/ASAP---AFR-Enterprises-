import { redirect } from "next/navigation";
import BlogIndex, { metadata as blogMetadata } from "../../page";

// /blog/page/{N}/ — the archive is a fixed shell, so deeper pages show the index
// with page 1 kept canonical rather than 404ing on old pagination links.
export async function generateMetadata({ params }) {
  const n = Number(params.n);
  if (!Number.isInteger(n) || n < 1) return {};
  return {
    ...blogMetadata,
    title: `${blogMetadata.title} — Page ${n}`,
    alternates: { canonical: "/blog/" },
    robots: { index: false, follow: true },
  };
}

export default function PaginatedBlog({ params }) {
  const n = Number(params.n);
  if (!Number.isInteger(n) || n <= 1) redirect("/blog/");
  return <BlogIndex />;
}
