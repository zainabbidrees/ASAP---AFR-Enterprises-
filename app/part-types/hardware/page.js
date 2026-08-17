import PartTypeLanding from "@/components/PartTypeLanding/PartTypeLanding";
import { SECTIONS } from "@/data/categories-hardware";

export const metadata = {
  title: "Hardware Parts Catalog | Industrial & IT Hardware | AFR Enterprises",
  description:
    "Browse AFR Enterprises' IT and industrial hardware parts catalog by category, manufacturer, or part number. Millions of components with fast RFQ responses.",
};

export default function HardwareLandingPage() {
  return (
    <PartTypeLanding
      breadcrumbLabel="Hardware Parts"
      h1="Computer IT Hardware Parts and Components List"
      intro={{
        before:
          "Finding the right hardware parts is simple with AFR Enterprises. Our Hardware Parts Catalog provides access to millions of components from leading",
        linkText: "manufacturers",
        linkHref: "/manufacturer/",
        after:
          ", allowing you to browse by product category, manufacturer, or part number. Explore popular hardware products, including 3D Sync Transmitters, Aidcpos, Armoires, Analog, Audio Transmittersreceivers, and quickly locate the parts that meet your procurement requirements.",
      }}
      whyTitle="Why Choose AFR Enterprises?"
      why={[
        { title: "Extensive Hardware Inventory", body: "Access millions of active, obsolete, and hard-to-find hardware parts from trusted global manufacturers." },
        { title: "Global Sourcing Network", body: "Our established supplier network helps customers source quality hardware components while reducing procurement lead times and supporting supply chain continuity." },
        { title: "Responsive Procurement Support", body: "Every Request for Quote (RFQ) receives personalized attention, providing competitive pricing, current availability, and dedicated sourcing assistance." },
      ]}
      howTitle="How to Source Hardware Parts"
      how={[
        { title: "Browse Our Catalog", body: "Search hardware parts by category, manufacturer, or part number." },
        { title: "Submit Your RFQ", body: "Complete our online Request for Quote (RFQ) form with your required part numbers and quantities." },
        { title: "Receive Your Quote", body: "Our procurement specialists will provide pricing, availability, and delivery information." },
        { title: "Complete Your Order", body: "Confirm your quotation, and our team will coordinate procurement and worldwide shipping." },
      ]}
      requestTitle="Request a Quote Today"
      requestBody="Whether you're sourcing replacement hardware components, obsolete inventory, or parts for ongoing maintenance and production, AFR Enterprises provides reliable procurement solutions backed by competitive pricing and worldwide distribution. Submit your RFQ today and let our procurement specialists help you quickly source the hardware parts you need."
      sections={SECTIONS}
    />
  );
}
