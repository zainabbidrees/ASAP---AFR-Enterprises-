import NsnDigitCatalog from "@/components/NsnDigitCatalog/NsnDigitCatalog";
import { SECTIONS } from "@/data/niin-numbers";

export const metadata = {
  title: "NIIN Lookup Tool | National Item Identification Numbers | AFR Enterprises",
  description:
    "Browse AFR Enterprises' NIIN catalog organized by leading digit. Look up National Item Identification Numbers and request a fast quote within 15 minutes.",
};



const DIGITS = ["0","1","2","3","4","5","6","7","8","9"].map((d) => ({
  digit: d,
  // 7 & 8 have no stocked NIINs, so they have no listing page.
  href: ["7", "8"].includes(d) ? null : `/nsn/niin-parts/page-${d}/`,
}));

export default function NiinPartsPage() {
  return (
    <NsnDigitCatalog
      breadcrumb={[{ label: "Home", href: "/" }, { label: "NSN", href: "/sitemap/" }, { label: "NIIN Parts" }]}
      h1="National Item Identification Number (NIIN) Catalog"
      entryLabel="NIIN"
      intro={[
        "National Item Identification Numbers (NIIN) are the last 9 digits of an ",
        { text: "NSN", href: "/nsn/nsn-parts/" },
        ", serving as a unique string that identifies particular items under any ",
        { text: "Federal Supply Class (FSC)", href: "/nsn/fscs/" },
        ". On this page, we provide NIIN lookup resources for customers to take advantage of, where every NIIN our stock falls under has been organized numerically for ease of browsing.",
      ]}
      blocks={[
        { title: "NIIN Lookup & Definition", items: [
          "Format: 2-digit NCB code (e.g., 00/01 for USA) + 7-digit item sequence. Add a 4-digit FSC to form a full 13-digit NSN.",
          "Easy Search: Organized numerically by the starting digit. Click any NIIN to see related parts or use \"View All\" for expanded listings.",
        ] },
        { title: "Applications & Sourcing", items: [
          "Industries: Commercial aviation, defense systems, tactical ground vehicles, and naval hardware.",
          "AOG & Cross-Referencing: Fast dispatch for grounded aircraft and multi-level matching across OEM, FSC, and CAGE codes.",
        ] },
        { title: "Why Choose AFR Enterprises?", items: [
          "Certifications: AS9120B, ISO 9001:2015, and FAA AC 00-56B accredited.",
          "Quality & Traceability: In-house/third-party testing and full CoC documentation.",
          "Service: Rapid domestic and international fulfillment with dedicated customer support.",
        ] },
      ]}
      quickTitle="Quick RFQ Process"
      quickBody="To submit a request, simply select your required NIIN and enter your target quantity, required condition (Factory New, New Surplus, or Overhauled), and delivery deadline. Once submitted, our dedicated team will process your request and deliver a fast quote within 15 minutes. For custom volume pricing, hard-to-find part sourcing, or additional technical assistance, you can reach out directly to our support team."
      digits={DIGITS}
      viewAllHref="/nsn/niin-parts/page-0/"
      sections={SECTIONS}
    />
  );
}
