import PartTypeLanding from "@/components/PartTypeLanding/PartTypeLanding";
import { SECTIONS } from "@/data/categories-electronics";

export const metadata = {
  title: "Electronic Parts Catalog | 2B+ Components | AFR Enterprises",
  description:
    "Browse AFR Enterprises' electronic parts catalog by category, manufacturer, or part number. Millions of active, obsolete, and hard-to-find components. Instant RFQ.",
};

export default function ElectronicsLandingPage() {
  return (
    <PartTypeLanding
      breadcrumbLabel="Electronics Parts"
      h1="Browse Our Electronic Parts Catalog"
      intro={{
        before:
          "Finding the right electronic components shouldn't be complicated. At AFR Enterprises, our Electronic Parts Catalog provides easy access to a comprehensive selection of components from leading",
        linkText: "manufacturers",
        linkHref: "/manufacturer/",
        after:
          ". Browse by product category, manufacturer, or part number to quickly locate the electronic parts that meet your technical and procurement requirements, whether for aerospace, defense, industrial, medical, telecommunications, or commercial applications.",
      }}
      whyTitle="Why Partner with AFR Enterprises?"
      why={[
        { title: "Comprehensive Product Selection", body: "Access millions of active, obsolete, and hard-to-find electronic components covering a wide range of product categories and applications." },
        { title: "Trusted Global Sourcing", body: "We work with an extensive network of established manufacturers and suppliers to help customers locate quality electronic components while supporting efficient procurement and supply chain continuity." },
        { title: "Responsive Procurement Support", body: "Our experienced sourcing specialists review every inquiry individually, helping customers identify suitable solutions based on availability, pricing, and delivery requirements." },
      ]}
      howTitle="How to Source Electronic Parts"
      how={[
        { title: "Browse Our Catalog", body: "Explore electronic parts by category, manufacturer, or part number." },
        { title: "Submit Your RFQ", body: "Complete our online Request for Quote (RFQ) form with your part numbers and quantities." },
        { title: "Receive Your Quote", body: "Our procurement team will provide pricing, availability, and delivery details." },
        { title: "Complete Your Order", body: "Confirm your quotation and our team will coordinate procurement and shipping." },
      ]}
      requestTitle="Request a Quote Today"
      requestBody="Whether you're sourcing a single replacement component or managing ongoing procurement for large-scale operations, AFR Enterprises is committed to delivering dependable service, competitive pricing, and access to a comprehensive electronic parts catalog. Submit your RFQ today and let our procurement specialists help you find the components you need."
      sections={SECTIONS}
    />
  );
}
