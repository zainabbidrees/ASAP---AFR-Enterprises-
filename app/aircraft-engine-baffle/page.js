import ToolingListing from "@/components/ToolingListing/ToolingListing";

export const metadata = {
  title: "Browse Aircraft Engine Baffle Parts Lookup | AFR Enterprises",
  description:
    "Explore aircraft engine baffle parts from Brown Aircraft Supply, Airforms Inc, and others. Browse the catalog and submit an RFQ for a fast quote.",
};

const R = (part, col2, desc, href) => ({ part, col2, desc, href });
const base = "/aircraft-engine-baffle/rfq";
const bas = "brown-aircraft-supply";
const air = "airforms-inc";

const ROWS = [
  R("T-95182-BL-36", "brown aircraft supply", "1/8\"x18\"x40\" silicone engine baffle blue sheet", `${base}/${bas}/t-95182-bl-36/`),
  R("T-95182-BL-3", "brown aircraft supply", "1/8\" x 2\" x 9' silicone engine baffle blue roll", `${base}/${bas}/t-95182-bl-3/`),
  R("T-95182-BL-2", "brown aircraft supply", "1/8\"x36\"x40\" silicone engine baffle red sheet", `${base}/${bas}/t-95182-bl-2/`),
  R("T-95182-BL-18", "brown aircraft supply", "1/8\"x3\"x9' silicone engine baffle blue roll", `${base}/${bas}/t-95182-bl-18/`),
  R("T-95182-36", "brown aircraft supply", "1/8\"x18\"x40\" silicone engine baffle red sheet", `${base}/${bas}/t-95182-36/`),
  R("T-95182-3", "brown aircraft supply", "1/8\" x 2\" x 9' silicone engine baffle red roll", `${base}/${bas}/t-95182-3/`),
  R("T-95182-2", "brown aircraft supply", "1/8 x 36 x 40 inch silicone engine baffle black", `${base}/${bas}/t-95182-2/`),
  R("T-95182-18", "brown aircraft supply", "1/8x3x9 silicone engine baffle red roll", `${base}/${bas}/t-95182-18/`),
  R("T-8071-36", "brown aircraft supply", "1/8\" x 18\" x 40\" silicone engine baffle black", `${base}/${bas}/t-8071-36/`),
  R("T-8071-3", "brown aircraft supply", "black silicone engine baffle 1/8\"x2\" x 9ft roll", `${base}/${bas}/t-8071-3/`),
  R("T-8071-2", "brown aircraft supply", "aeronca engine baffle assembly - left front, 11b, 11c, 11d,", `${base}/${bas}/t-8071-2/`),
  R("T-8071-18", "brown aircraft supply", "black silicone engine baffle 1/8\"x3\"x 9ft roll", `${base}/${bas}/t-8071-18/`),
  R("PA44180-PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa44180-pcbk/`),
  R("PA44180-BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa44180-brbk/`),
  R("PA32260-68.578PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa32260-68-578pcbk/`),
  R("PA32260-68.578BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa32260-68-578brbk/`),
  R("PA32260-6568.5PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa32260-6568-5pcbk/`),
  R("PA32260-6568.5BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa32260-6568-5brbk/`),
  R("PA31325350-PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa31325350-pcbk/`),
  R("PA31325350-BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa31325350-brbk/`),
  R("PA31310-PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa31310-pcbk/`),
  R("PA31310-BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa31310-brbk/`),
  R("PA30-PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa30-pcbk/`),
  R("PA30-BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa30-brbk/`),
  R("PA28R201-PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa28r201-pcbk/`),
  R("PA28R201-BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa28r201-brbk/`),
  R("PA28R200-PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa28r200-pcbk/`),
  R("PA28R200-BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa28r200-brbk/`),
  R("PA28236-PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa28236-pcbk/`),
  R("PA28236-BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa28236-brbk/`),
  R("PA28235-PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa28235-pcbk/`),
  R("PA28235-BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa28235-brbk/`),
  R("PA28181-3PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa28181-3pcbk/`),
  R("PA28181-3BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa28181-3brbk/`),
  R("PA28181-2PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa28181-2pcbk/`),
  R("PA28181-2BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa28181-2brbk/`),
  R("PA28180-72575PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa28180-72575pcbk/`),
  R("PA28180-72575BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa28180-72575brbk/`),
  R("PA28180-6572.5PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa28180-6572-5pcbk/`),
  R("PA28180-6572.5BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa28180-6572-5brbk/`),
  R("PA28161-PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa28161-pcbk/`),
  R("PA28161-BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa28161-brbk/`),
  R("PA28140-6471.5PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa28140-6471-5pcbk/`),
  R("PA28140-6471.5BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa28140-6471-5brbk/`),
  R("PA22150-PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa22150-pcbk/`),
  R("PA22150-BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa22150-brbk/`),
  R("PA18150-PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/pa18150-pcbk/`),
  R("PA18150-BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/pa18150-brbk/`),
  R("M20J-PCBK", "airforms inc", "engine baffle kit", `${base}/${air}/m20j-pcbk/`),
  R("M20J-BRBK", "airforms inc", "engine baffle kit, powder coat", `${base}/${air}/m20j-brbk/`),
];

export default function AircraftEngineBafflePage() {
  return (
    <ToolingListing
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Aircraft Engine Baffle" }]}
      h1="Explore Aircraft Engine Baffle Parts"
      intro="Here on AFR Enterprises, we make it simple for customers seeking aircraft engine baffle components to secure all they need on a single, streamlined platform. On this catalog, you can browse through every part number that we currently have in stock, our selection being replete with options from Brown Aircraft Supply, Airforms Inc, Lycoming, Aeronca, and others. Take all the time you need to peruse the listings, knowing that you can move forward with a purchase at any time using our simplified Request for Quote (RFQ) services."
      sections={[
        {
          title: "How to Request a Quote on Aircraft Engine Baffle Parts",
          bullets: [
            "Reach Out Directly: Call or email us anytime, as we are ready to jump in and offer the hands-on support you need to tackle your engine baffle part requirements and help you identify the right fit from our aviation baffle parts inventory.",
            "Submit Requests Online: Prefer to work at your own pace? Our website's Request for Quote (RFQ) forms are available for you to conveniently submit part numbers, quantities, and project details and receive quick responses from our team.",
          ],
        },
      ]}
      col2Header="Manufacturer"
      rows={ROWS}
      displaying="Displaying Page: 1 of 12"
      pageBase="/aircraft-engine-baffle/page-"
      totalPages={10}
    />
  );
}
