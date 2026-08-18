import NsnDigitCatalog from "@/components/NsnDigitCatalog/NsnDigitCatalog";
import { SECTIONS } from "@/data/nsn-numbers";

export const metadata = {
  title: "Verified NSN Parts & Aerospace Hardware | AFR Enterprises",
  description:
    "Look up verified National Stock Numbers (NSN) organized by leading digit. AFR Enterprises provides full supply-chain traceability and rapid RFQ turnarounds.",
};



const DIGITS = ["1","2","3","4","5","6","7","8","9"].map((d) => ({ digit: d, href: `/nsn/nsn-parts/page-${d}/` }));

export default function NsnPartsPage() {
  return (
    <NsnDigitCatalog
      breadcrumb={[{ label: "Home", href: "/" }, { label: "NSN", href: "/sitemap/" }, { label: "NSN Parts" }]}
      h1="Verified NSN Parts Lookup & Sourcing | AFR Enterprises"
      entryLabel="NSN"
      cols={3}
      intro={[
        "Need verified National Stock Numbers (NSN) or hard-to-find defense and aerospace hardware? AFR Enterprises streamlines procurement for civil, commercial, and defense operations. As an AS9120B, ISO 9001:2015, and FAA AC 00-56B accredited distributor, we provide full supply chain traceability and rapid RFQ turnarounds.",
      ]}
      blocks={[
        { title: "Browse Our NSN Inventory Directory", items: [
          "Browse by NSN First Digit (1-9): Click any primary numerical group (1560, 2910, 5935, etc.) to view real-time stock availability.",
          "Cross-Reference Sourcing: Search directly by 9-digit NIIN, 5-digit CAGE Code, or 4-digit Federal Supply Classification (FSC) to find OEM equivalents and MIL-SPEC parts.",
        ] },
        { title: "Why Procurement Teams Trust AFR Enterprises", items: [
          "Quality Assured & Audit-Ready: Every component undergoes rigorous visual, dimensional, and paperwork inspection. All orders ship with essential documentation, including Certificates of Conformance (CoC) and complete batch traceability.",
          "Strict Supply Chain Integrity: We fulfill orders exclusively through vetted, trusted supply chain partners in accordance with U.S. export laws.",
          "AOG & Emergency Support: Minimize aircraft grounding time with prioritized quote processing and expedited global shipping.",
        ] },
        { title: "How to Request Quotes on NSN Parts", items: [
          "Submit an Online RFQ: Fill out our quick online request form on any part listing page for a rapid response from our specialist team.",
          "Contact Us Directly: Call +1 (714) 705-4780 or email sales@afrenterprises.com for immediate, hands-on assistance.",
        ] },
      ]}
      digits={DIGITS}
      viewAllHref="/nsn/nsn-parts/page-1/"
      sections={SECTIONS}
    />
  );
}
