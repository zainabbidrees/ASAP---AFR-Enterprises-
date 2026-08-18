import RfqDetail from "@/components/RfqDetail/RfqDetail";
import { titleize } from "@/lib/catalog";

// Canonical NSN RFQ URL: /nsn/rfq/{manufacturer}/{nsn-numeric}/{part}/ (§4.9)
export async function generateMetadata({ params }) {
  const part = params.part.toUpperCase();
  const mfr = titleize(params.mfr);
  return {
    title: `${part}, NSN ${params.nsn}, ${mfr} | RFQ | AFR Enterprises`,
    description: `${part} from ${mfr} under National Stock Number ${params.nsn}. AFR Enterprises supplies NSN-catalogued hardware under CAGE code 6RE77 with full traceability. Quote in 15 minutes.`,
  };
}

export default function Page({ params }) {
  const mfrName = titleize(params.mfr);
  return (
    <RfqDetail
      mfr={params.mfr}
      part={params.part}
      nsn={params.nsn}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "NSN Parts", href: "/nsn/nsn-parts/" },
        { label: params.nsn, href: `/nsn/nsn-parts/${params.nsn}/` },
        { label: params.part.toUpperCase() },
      ]}
      backHref={`/nsn/nsn-parts/${params.nsn}/`}
      backLabel={`View every part under NSN ${params.nsn} →`}
    />
  );
}
