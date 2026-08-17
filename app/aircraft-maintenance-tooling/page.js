import ToolingListing from "@/components/ToolingListing/ToolingListing";

export const metadata = {
  title: "Listing of Aviation Maintenance Tooling Components | AFR Enterprises",
  description:
    "A trusted source for aircraft maintenance tooling parts from leading manufacturers. Browse the catalog and submit an RFQ for fast pricing and availability.",
};

const R = (part, col2, desc, href) => ({ part, col2, desc, href });
const base = "/aircraft-maintenance-tooling/rfq";

const ROWS = [
  R("XX6504730", "boeing", "kit, patch test - hydraulic fluid", `${base}/boeing/b747-all-series-tooling/xx6504730/`),
  R("WT111M", "boeing", "pliers - crimper, cable ferrule", `${base}/boeing/b747-all-series-tooling/wt111m/`),
  R("UCR-2-3-1", "boeing", "recorder - copy, universal (for solid state dfdr's only)", `${base}/boeing/b787-all-series-tooling/ucr-2-3-1/`),
  R("U21980", "airbus", "extractor for pin", `${base}/airbus/a330-a340-tooling/u21980/`),
  R("U21968", "airbus", "support for the adjustmnt of the deflectn of the lock", `${base}/airbus/a330-a340-tooling/u21968/`),
  R("TS200", "airbus", "test set", `${base}/airbus/a318-319-320-321-tooling/ts200/`),
  R("TS1275-4", "boeing", "sealant removal scraper", `${base}/boeing/b737-all-series-tooling/ts1275-4/`),
  R("TRSV01F78AH50", "airbus", "rod-hold open t/r cowl rh", `${base}/airbus/a330-a340-tooling/trsv01f78ah50/`),
  R("TRSV01F78AH00", "airbus", "rod-hold open t/r cowl lh", `${base}/airbus/a330-a340-tooling/trsv01f78ah00/`),
  R("TRSV01F71AC50", "airbus", "brace-hold open fan cowl rh", `${base}/airbus/a330-a340-tooling/trsv01f71ac50/`),
  R("TRSV01F71AC00", "airbus", "brace-hold open fan cowl lh", `${base}/airbus/a330-a340-tooling/trsv01f71ac00/`),
  R("TR60-1", "boeing", "rigmaster, electronic protractor kit.", `${base}/boeing/b747-all-series-tooling/tr60-1/`),
  R("TR31/1", "boeing", "one channel rigmaster protractor system (economy version of the tr60-1)", `${base}/boeing/b747-all-series-tooling/tr311/`),
  R("TMHGA38-00-00", "airbus", "filling assembly", `${base}/airbus/a318-319-320-321-tooling/tmhga38-00-00/`),
  R("TC869", "boeing", "probe - temperature, surface", `${base}/boeing/b747-all-series-tooling/tc869/`),
  R("TC1-804", "boeing", "sling - single ply nylon web belt choker", `${base}/boeing/b747-all-series-tooling/tc1-804/`),
  R("TBM14M", "boeing", "crimp tool - 14 ton, hydraulic tool", `${base}/boeing/b747-all-series-tooling/tbm14m/`),
  R("T9-2021K", "boeing", "rvdt stop", `${base}/boeing/b787-all-series-tooling/t9-2021k/`),
  R("T9-2020K", "boeing", "torque driver", `${base}/boeing/b787-all-series-tooling/t9-2020k/`),
  R("T720330", "airbus", "splined adaptor", `${base}/airbus/a330-a340-tooling/t720330/`),
  R("T71884", "airbus", "inspection tool", `${base}/airbus/a318-319-320-321-tooling/t71884/`),
  R("T5-8008-106-00", "boeing", "tensiometer - cable range - 40-600 lbs for 1/8, 5/32, 3/16, & 1/4 cables", `${base}/boeing/b747-all-series-tooling/t5-8008-106-00/`),
  R("T5-0497K", "boeing", "spanner wrench", `${base}/boeing/b737-all-series-tooling/t5-0497k/`),
  R("T477W", "boeing", "bonding meter", `${base}/boeing/b737-all-series-tooling/t477w/`),
  R("T27210", "airbus", "poppet assembly tool", `${base}/airbus/a330-a340-tooling/t27210/`),
  R("T26967", "airbus", "flow regulator", `${base}/airbus/a330-a340-tooling/t26967/`),
  R("T26966", "airbus", "flow regulator", `${base}/airbus/a330-a340-tooling/t26966/`),
  R("T26603", "airbus", "restraint - bellcrank", `${base}/airbus/a330-a340-tooling/t26603/`),
  R("T26583", "airbus", "restraint - bellcrank", `${base}/airbus/a330-a340-tooling/t26583/`),
  R("T26359", "airbus", "restraint - bellcrank", `${base}/airbus/a330-a340-tooling/t26359/`),
  R("T20273", "airbus", "tool-splined lever and checking", `${base}/airbus/a330-a340-tooling/t20273/`),
  R("T19862", "airbus", "torque spanner", `${base}/airbus/a330-a340-tooling/t19862/`),
  R("T19662", "airbus", "tool-bearing housing insertion/removal", `${base}/airbus/a330-a340-tooling/t19662/`),
  R("T14549", "airbus", "kit-inlation,turner", `${base}/airbus/a330-a340-tooling/t14549/`),
  R("T14540", "airbus", "crowfoot spanner", `${base}/airbus/a330-a340-tooling/t14540/`),
  R("T14539", "airbus", "crowfoot spanner", `${base}/airbus/a330-a340-tooling/t14539/`),
  R("T14489", "airbus", "turner inflation equipment", `${base}/airbus/a330-a340-tooling/t14489/`),
  R("T14218", "airbus", "turner inflation equipment", `${base}/airbus/a330-a340-tooling/t14218/`),
  R("SYSTEM #5", "boeing", "regulator unit - air purification", `${base}/boeing/b747-all-series-tooling/system--5/`),
  R("STS-1102", "boeing", "tool set - application, band, manual for 1/4 in bands", `${base}/boeing/b747-all-series-tooling/sts-1102/`),
  R("ST9999-VBA-201", "boeing", "generator - vacuum", `${base}/boeing/b747-all-series-tooling/st9999-vba-201/`),
  R("ST9999-VB", "boeing", "bag - assembly, door vacuum", `${base}/boeing/b747-all-series-tooling/st9999-vb/`),
  R("ST991A-2-250", "boeing", "scrivet fastener slope panel in fwd & aft cargo compartment = 1/4\"", `${base}/boeing/b767-all-series-tooling/st991a-2-250/`),
  R("ST991A-2", "boeing", "scrivet fastener slope panel in fwd & aft cargo compartment", `${base}/boeing/b767-all-series-tooling/st991a-2/`),
  R("ST921MB", "boeing", "standard tool - straight sleeve removal tool", `${base}/boeing/b747-all-series-tooling/st921mb/`),
  R("ST921MA", "boeing", "standard tool - tapered sleeve removal tool", `${base}/boeing/b747-all-series-tooling/st921ma/`),
  R("ST895A-3", "boeing", "probe - surface resistivity measurement", `${base}/boeing/b747-all-series-tooling/st895a-3/`),
  R("ST8871D", "boeing", "reference standard", `${base}/boeing/b737-all-series-tooling/st8871d/`),
  R("ST879AF", "boeing", "holder - tube fitting, preset", `${base}/boeing/b747-all-series-tooling/st879af/`),
  R("ST879A", "boeing", "kit - preset tube fitting, \"sleeve set\", (not for titanium tubing) (set fo 25 ea. dies, mandresl, & clamps)", `${base}/boeing/b747-all-series-tooling/st879a/`),
];

export default function AircraftMaintenanceToolingPage() {
  return (
    <ToolingListing
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Aircraft Maintenance Tooling" }]}
      h1="A Trusted Source for Aircraft Maintenance Tooling Parts"
      intro="As an ASAP Semiconductor purchasing platform, AFR Enterprises is proud to present a diverse collection of aircraft maintenance tooling parts that all trace back to leading manufacturers and suppliers you can trust. While browsing our expansive selection, you will see that we have organized every listing with part types, manufacturer, and description data to simplify identification and comparison. With multiple pages replete with ready-for-purchase items, take all the time you need to explore our aviation maintenance tooling catalog. If anything is of interest, you can always take advantage of our Request for Quote (RFQ) services to request pricing and availability without delay."
      sections={[
        {
          title: "How to Request a Quote",
          bullets: [
            "Contact Staff Directly: Using our phone number or email address, you can connect with us to discuss your requirements, knowing we will provide hands-on assistance to help you find the right aviation maintenance tooling parts for your MRO and line-maintenance needs.",
            "Submit a Request Online: For convenience, you can also submit a request directly through our website, using our RFQ forms to send your part numbers, quantities, and project details. Our team will review your information and respond quickly with tailored solutions.",
          ],
        },
      ]}
      closing="However you choose to proceed, know that our team will work tirelessly to bring the most advantageous aircraft maintenance tooling part solutions to the table, always keeping your budget and timeline in mind."
      col2Header="Manufacturer"
      rows={ROWS}
      displaying="Displaying Page: 1 of 62"
      pageBase="/aircraft-maintenance-tooling/page-"
      totalPages={10}
    />
  );
}
