import RfqDetail from "./RfqDetail";
import { titleize } from "@/lib/catalog";

// The Aircraft Tooling sections all point at an RFQ page one or two levels deeper
// than the general one: /{section}/rfq/{mfr}/{engine|series}/{part}/ for engine
// parts and maintenance tooling, /{section}/rfq/{mfr}/{part}/ for baffles and
// avionics test equipment (§4.10). Same conversion page, different breadcrumb
// trail and one extra identity row.
export default function ToolingRfq({ section, href, midLabel, mfr, mid, part }) {
  const midName = mid ? titleize(mid).toUpperCase() : null;

  return (
    <RfqDetail
      mfr={mfr}
      part={part}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: section, href },
        ...(midName ? [{ label: midName }] : []),
        { label: part.toUpperCase() },
      ]}
      backHref={href}
      backLabel={`View the full ${section.toLowerCase()} listing →`}
      extraSpec={midName && midLabel ? [{ label: midLabel, value: midName }] : undefined}
    />
  );
}

ToolingRfq.metadata = function metadata({ section, mfr, mid, part }) {
  const partNo = String(part).toUpperCase();
  const mfrName = titleize(mfr);
  const midName = mid ? titleize(mid).toUpperCase() : null;
  const scope = midName ? `${midName} — ` : "";

  return {
    title: `${partNo} — ${scope}${mfrName} | ${section} RFQ | AFR Enterprises`,
    description: `${partNo} from ${mfrName}${midName ? ` for ${midName}` : ""}, available through AFR Enterprises. Pricing, availability and lead time in writing within 15 minutes. AS9120B certified, AOG desk staffed 24/7.`,
  };
};
