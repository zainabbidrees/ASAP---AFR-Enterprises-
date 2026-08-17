import SectionHub from "@/components/SectionHub/SectionHub";

export const metadata = {
  title: "Parts Catalog — Electronics, Aviation & IT Hardware | AFR Enterprises",
  description:
    "Browse the AFR Enterprises parts catalog by family: electronic components, aviation components and IT hardware. Millions of active, obsolete and hard-to-find parts. Instant RFQ.",
};

export default function PartTypesHub() {
  return (
    <SectionHub
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Part Types" }]}
      eyebrow="The catalog"
      h1="Three families, one purchasing platform"
      lead="Everything we stock and source sits in one of three families. Each opens onto an A–Z of part categories, and each category onto its full part-number list with the manufacturer against every line."
      cards={[
        {
          title: "Electronic Components",
          body: "Semiconductors, connectors, passives, relays, switches and board-level hardware — active, obsolete and end-of-life. Handled to ANSI/ESD S20.20 and screened for counterfeit under AS6081.",
          href: "/part-types/electronics/",
          label: "Browse electronics categories",
        },
        {
          title: "Aviation Components",
          body: "Circuit breakers, starter generators, pressure switches, sensors, hoses and cabin hardware for civil, commercial and defense fleets. AS9120B certified with full traceability to source.",
          href: "/part-types/aviation/",
          label: "Browse aviation categories",
        },
        {
          title: "IT Hardware",
          body: "Microprocessors, memory, networking, storage and peripheral hardware — including long-discontinued lines that legacy systems still depend on.",
          href: "/part-types/hardware/",
          label: "Browse hardware categories",
        },
        {
          title: "NSN & Defense Hardware",
          body: "The same inventory indexed the way the federal supply system indexes it — by National Stock Number, NIIN, Federal Supply Class and CAGE code.",
          href: "/nsn/",
          label: "Enter the NSN catalog",
        },
        {
          title: "Aircraft Tooling & Engine Parts",
          body: "Engine parts, maintenance tooling, engine baffles and avionics test equipment, listed by part number with the engine or aircraft series against each.",
          href: "/aircraft-engine-parts/",
          label: "Browse tooling listings",
        },
        {
          title: "Manufacturers A–Z",
          body: "Prefer to start from the brand? The full manufacturer directory, each name opening onto its own part-number catalog.",
          href: "/manufacturer/",
          label: "Browse manufacturers",
        },
      ]}
      note="Can't find the category? The catalog is a subset of what we can source. Send the part number and a specialist will tell you honestly whether we can hit your date."
    />
  );
}
