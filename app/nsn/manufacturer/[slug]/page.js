import CatalogListing from "@/components/CatalogListing/CatalogListing";
import { nsnParts, pageCount, slugify, titleize } from "@/lib/catalog";
import { CTA } from "@/lib/copy";
import { MFR_POOL } from "@/lib/catalog";

export function generateStaticParams() {
  return MFR_POOL.map((m) => ({ slug: slugify(m) }));
}

export async function generateMetadata({ params }) {
  const name = titleize(params.slug);
  return {
    title: `${name} NSN Parts & Stock Numbers | AFR Enterprises`,
    description: `National Stock Numbers, part numbers and item names supplied under ${name}. AFR Enterprises, CAGE code 6RE77, AS9120B certified. Quote in 15 minutes.`,
  };
}

export default function Page({ params }) {
  const name = titleize(params.slug);
  const rows = nsnParts(`nsnmfr:${params.slug}`, 45);
  const total = pageCount(`nsnmfr:${params.slug}`, 2, 30);

  return (
    <CatalogListing
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "NSN Parts", href: "/nsn/nsn-parts/" },
        { label: "Manufacturers", href: "/nsn/manufacturer/" },
        { label: name },
      ]}
      h1={`${name} NSN Parts Catalog`}
      intro={`National Stock Numbers supplied under ${name}. Each line shows the stock number, item name and part number as catalogued in the federal supply system. AFR Enterprises holds CAGE code 6RE77 and ships every order with full traceability documentation.`}
      linkList={{
        title: "Cross-Reference This Manufacturer",
        items: [
          [`${name} commercial catalog`, `/manufacturer/${params.slug}/`],
          ["Browse all NSN manufacturers", "/nsn/manufacturer/"],
          ["Search by CAGE code", "/nsn/cage-codes/"],
          ["Search by Federal Supply Class", "/nsn/fscs/"],
        ],
      }}
      tableTitle={`${name} Stock Numbers`}
      columns={[
        { key: "part", header: "Part No.", kind: "part" },
        { key: "nsn", header: "NSN", kind: "link", hrefKey: "nsnHref" },
        { key: "item", header: "Item Name" },
        { key: "qty", header: "QTY" },
        { key: "rfq", header: "RFQ / Cart", kind: "rfq" },
      ]}
      rows={rows.map((r) => ({ ...r, nsnHref: `/nsn/nsn-parts/${r.nsnFlat}/` }))}
      pager={{
        displaying: `Displaying Page: 1 of ${total}`,
        base: `/nsn/manufacturer/${params.slug}/page-`,
        total,
      }}
      cta={CTA}
    />
  );
}
