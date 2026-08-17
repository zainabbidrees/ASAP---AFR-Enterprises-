import SectionHub from "@/components/SectionHub/SectionHub";

export const metadata = {
  title: "NSN Parts Lookup — NSN, NIIN, FSC & CAGE Code Search | AFR Enterprises",
  description:
    "Look up National Stock Numbers, NIINs, Federal Supply Classes and CAGE codes. AFR Enterprises supplies NSN-catalogued defense and aerospace hardware under CAGE code 6RE77.",
};

export default function NsnHub() {
  return (
    <SectionHub
      breadcrumb={[{ label: "Home", href: "/" }, { label: "NSN Parts" }]}
      eyebrow="Federal supply system"
      h1="NSN parts lookup, five ways in"
      lead="Every route into the federal supply catalog we hold. Start from the stock number, the item identification number, the supply class, the CAGE code or the part-type name — they all cross-reference to the same inventory, and every line quotes back within 15 minutes."
      cards={[
        {
          title: "Parts by NSN",
          body: "The full 13-digit National Stock Number, grouped by leading digit. The richest records on the site — part numbers, approved manufacturers and MIL-STD characteristic data against each stock number.",
          href: "/nsn/nsn-parts/",
          label: "Browse NSN groups 1–9",
        },
        {
          title: "Parts by NIIN",
          body: "The 9-digit National Item Identification Number, without the supply-class prefix. Useful when your paperwork carries the NIIN alone. Factory New, New Surplus and Overhauled conditions all quoted.",
          href: "/nsn/niin-parts/",
          label: "Browse NIIN groups",
        },
        {
          title: "Federal Supply Classes",
          body: "The 4-digit FSC that opens the stock number, with a part count against each class. The right entry point when you know the commodity but not the specific item.",
          href: "/nsn/fscs/",
          label: "Browse FSC codes",
        },
        {
          title: "CAGE Codes",
          body: "Commercial and Government Entity codes with the registered manufacturer behind each one, plus their address, status and CAO registration. Ours is 6RE77.",
          href: "/nsn/cage-codes/",
          label: "Browse the CAGE directory",
        },
        {
          title: "NSN Part Types",
          body: "The plain-language item name — auxiliary switch, bracket rigging, filter assembly — for when you have the description and need the stock number.",
          href: "/nsn/part-types/",
          label: "Browse part types A–Z",
        },
        {
          title: "Approved Manufacturers",
          body: "The manufacturers behind the stock numbers we supply, cross-linked to their commercial catalogs and CAGE registrations.",
          href: "/nsn/manufacturer/",
          label: "Browse NSN manufacturers",
        },
      ]}
      note="Have the number already? Skip the browse and send it straight through — a named specialist returns pricing, availability, condition and lead time in writing, normally inside 15 minutes."
    />
  );
}
