import RfqDetail from "@/components/RfqDetail/RfqDetail";
import { titleize } from "@/lib/catalog";

export async function generateMetadata({ params }) {
  const part = params.part.toUpperCase();
  const mfr = titleize(params.mfr);
  return {
    title: `${part} — ${mfr} | RFQ Now | AFR Enterprises`,
    description: `${part} from ${mfr} available through AFR Enterprises. Pricing, availability, condition and lead time in writing within 15 minutes. AS9120B certified, full traceability.`,
  };
}

export default function Page({ params }) {
  const mfrName = titleize(params.mfr);
  return (
    <RfqDetail
      mfr={params.mfr}
      part={params.part}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Manufacturers", href: "/manufacturer/" },
        { label: mfrName, href: `/manufacturer/${params.mfr}/` },
        { label: params.part.toUpperCase() },
      ]}
      backHref={`/manufacturer/${params.mfr}/`}
      backLabel={`View the full ${mfrName} catalog →`}
    />
  );
}
