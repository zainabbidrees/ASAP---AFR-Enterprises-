import CategoryRoute, { categoryMetadata, familyParams } from "@/components/CategoryRoute/CategoryRoute";
import { SECTIONS } from "@/data/categories-aviation";

const FAMILY = "aviation";

// Every category slug plus every page-{letter} index in this family.
export function generateStaticParams() {
  return familyParams(SECTIONS);
}

export async function generateMetadata({ params }) {
  return categoryMetadata(FAMILY, params.category, SECTIONS);
}

export default function Page({ params }) {
  return <CategoryRoute family={FAMILY} slug={params.category} sections={SECTIONS} />;
}
