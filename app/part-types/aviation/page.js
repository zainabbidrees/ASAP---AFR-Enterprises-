import PartTypeLanding from "@/components/PartTypeLanding/PartTypeLanding";
import { SECTIONS } from "@/data/categories-aviation";

export const metadata = {
  title: "Aviation Parts Supplier | Aircraft Parts Catalog | Fast RFQs | AFR Enterprises",
  description:
    "Browse AFR Enterprises' aviation parts catalog by category, manufacturer, or part number. Aircraft components for MRO and production with fast RFQ responses.",
};

export default function AviationLandingPage() {
  return (
    <PartTypeLanding
      breadcrumbLabel="Aviation Parts"
      h1="Aviation Components Online Listing"
      intro={{
        before:
          "Finding the right aviation parts is essential for maintaining aircraft safety, operational efficiency, and regulatory compliance. At AFR Enterprises, our Aviation Parts Catalog provides convenient access to a comprehensive selection of aircraft components from leading",
        linkText: "manufacturers",
        linkHref: "/manufacturer/",
        after:
          ". Browse by product category, manufacturer, or part number to quickly locate the aviation parts that meet your maintenance, repair, overhaul (MRO), and production requirements for commercial, military, and general aviation applications.",
      }}
      whyTitle="Why Choose AFR Enterprises?"
      why={[
        { title: "Extensive Aviation Inventory", body: "Access millions of active, obsolete, and hard-to-find aviation components, including aircraft hardware, electrical parts, electronics parts, fasteners, bearings, connectors, avionics components, and other critical aircraft products from trusted global manufacturers." },
        { title: "Global Sourcing Network", body: "Our worldwide supplier network enables us to source quality aviation parts while helping customers reduce lead times, maintain fleet readiness, and support efficient maintenance and procurement operations." },
        { title: "Responsive Procurement Support", body: "Every Request for Quote (RFQ) is reviewed by our experienced procurement specialists to provide current availability, competitive pricing, and personalized sourcing assistance based on your operational requirements." },
      ]}
      howTitle="How to Source Aviation Parts"
      how={[
        { title: "Browse Our Catalog", body: "Search aviation parts by category, manufacturer, or part number." },
        { title: "Submit Your RFQ", body: "Complete our online Request for Quote (RFQ) form with your required part numbers and quantities." },
        { title: "Receive Your Quote", body: "Our procurement specialists will provide pricing, availability, and delivery information." },
        { title: "Complete Your Order", body: "Confirm your quotation, and our team will coordinate procurement and worldwide shipping." },
      ]}
      requestTitle="Request a Quote Today"
      requestBody="Whether you're sourcing replacement aircraft components, obsolete aviation parts, or inventory for scheduled maintenance, AFR Enterprises provides reliable procurement solutions backed by competitive pricing, fast RFQ responses, and worldwide distribution. Submit your Request for Quote today and let our procurement specialists help you source the aviation parts you need with confidence."
      sections={SECTIONS}
    />
  );
}
