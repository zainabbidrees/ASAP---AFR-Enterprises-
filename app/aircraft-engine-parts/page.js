import ToolingListing from "@/components/ToolingListing/ToolingListing";

export const metadata = {
  title: "Aircraft Engine Parts Catalog and Hardware | AFR Enterprises",
  description:
    "A reliable source for aircraft engine parts — hardware, engine system electronics, fluid system parts, and assemblies. Submit an RFQ for a fast quote.",
};

const R = (part, col2, desc, href) => ({ part, col2, desc, href });

const ROWS = [
  R("VTF00933", "pw4000", "link", "/aircraft-engine-parts/rfq/other/pw4000/vtf00933/"),
  R("VR1029-400", "cfm56-7", "coupling", "/aircraft-engine-parts/rfq/other/cfm56-7/vr1029-400/"),
  R("VR1025-350", "cfm56-7", "clamp assy", "/aircraft-engine-parts/rfq/other/cfm56-7/vr1025-350/"),
  R("VR1025-175", "cfm56-7", "coupling", "/aircraft-engine-parts/rfq/other/cfm56-7/vr1025-175/"),
  R("VR1006-350", "cfm56-7", "coupling", "/aircraft-engine-parts/rfq/other/cfm56-7/vr1006-350/"),
  R("UP60482", "v2500", "bracket", "/aircraft-engine-parts/rfq/other/v2500/up60482/"),
  R("UP11228", "v2500", "bracket", "/aircraft-engine-parts/rfq/other/v2500/up11228/"),
  R("UP11073GTM", "v2500", "joint", "/aircraft-engine-parts/rfq/other/v2500/up11073gtm/"),
  R("UP11073", "v2500", "rod, control vane act mech", "/aircraft-engine-parts/rfq/other/v2500/up11073/"),
  R("UP10897", "v2500", "washer", "/aircraft-engine-parts/rfq/other/v2500/up10897/"),
  R("UP10896", "v2500", "nut ring", "/aircraft-engine-parts/rfq/other/v2500/up10896/"),
  R("UA538950-8", "cf6-80c2", "servo fuel heater", "/aircraft-engine-parts/rfq/klm-engineering-and-maintenance/cf6-80c2/ua538950-8/"),
  R("UA538950-7", "cf6-80c2", "servo fuel heater", "/aircraft-engine-parts/rfq/triumph/cf6-80c2/ua538950-7/"),
  R("UA538950-4", "cf6-80c2", "servo fuel heater", "/aircraft-engine-parts/rfq/air-france/cf6-80c2/ua538950-4/"),
  R("TC316-00", "cfm56-5a", "harness-wiring egt 3tc", "/aircraft-engine-parts/rfq/other/cfm56-5a/tc316-00/"),
  R("TC316-00", "cfm56-5b", "harness-wiring egt 3tc", "/aircraft-engine-parts/rfq/other/cfm56-5b/tc316-00/"),
  R("TC315-00", "cfm56-5a", "harness-wiring egt 2tc", "/aircraft-engine-parts/rfq/other/cfm56-5a/tc315-00/"),
  R("TC315-00", "cfm56-5b", "harness-wiring egt 2tc", "/aircraft-engine-parts/rfq/other/cfm56-5b/tc315-00/"),
  R("TC296-02", "cfm56-7", "probe-t49.5", "/aircraft-engine-parts/rfq/other/cfm56-7/tc296-02/"),
  R("TC201-01", "cfm56-5a", "oil temp sensor", "/aircraft-engine-parts/rfq/other/cfm56-5a/tc201-01/"),
  R("TC201-01", "cfm56-5b", "oil temp sensor", "/aircraft-engine-parts/rfq/other/cfm56-5b/tc201-01/"),
  R("TC201-00", "cfm56-5a", "oil temp sensor", "/aircraft-engine-parts/rfq/other/cfm56-5a/tc201-00/"),
  R("TC201-00", "cfm56-5b", "oil temp sensor", "/aircraft-engine-parts/rfq/other/cfm56-5b/tc201-00/"),
  R("TC201-00", "cfm56-5a", "oil temp sensor", "/aircraft-engine-parts/rfq/auxitrol/cfm56-5a/tc201-00/"),
  R("TC201-00", "cfm56-5b", "oil temp sensor", "/aircraft-engine-parts/rfq/auxitrol/cfm56-5b/tc201-00/"),
  R("TC199-01", "cfm56-5a", "t5 temperature sensor", "/aircraft-engine-parts/rfq/auxitrol/cfm56-5a/tc199-01/"),
  R("TC194-02", "cfm56-5a", "harness-wiring egt 2tc", "/aircraft-engine-parts/rfq/auxitrol/cfm56-5a/tc194-02/"),
  R("TA30700035", "pw4000", "clamp", "/aircraft-engine-parts/rfq/other/pw4000/ta30700035/"),
  R("TA30500371", "pw4000", "clamp", "/aircraft-engine-parts/rfq/other/pw4000/ta30500371/"),
  R("TA30300231", "v2500", "bracket", "/aircraft-engine-parts/rfq/other/v2500/ta30300231/"),
  R("TA12800007-03", "cf6-80c2", "clamp", "/aircraft-engine-parts/rfq/other/cf6-80c2/ta12800007-03/"),
  R("TA12800007-01", "cf6-80c2", "clamp", "/aircraft-engine-parts/rfq/other/cf6-80c2/ta12800007-01/"),
  R("TA121010829-04", "pw4000", "clamp", "/aircraft-engine-parts/rfq/other/pw4000/ta121010829-04/"),
  R("TA121003B16-04", "cfm56-5b", "clamp", "/aircraft-engine-parts/rfq/other/cfm56-5b/ta121003b16-04/"),
  R("TA11C91", "cfm56-5b", "clamp", "/aircraft-engine-parts/rfq/other/cfm56-5b/ta11c91/"),
  R("TA10950004-05", "cfm56-5b", "clamp block (spring)", "/aircraft-engine-parts/rfq/other/cfm56-5b/ta10950004-05/"),
  R("TA05K59B04 J", "cf6-80c2", "clamp", "/aircraft-engine-parts/rfq/other/cf6-80c2/ta05k59b04-j/"),
  R("TA025074-07", "v2500", "clamp", "/aircraft-engine-parts/rfq/other/v2500/ta025074-07/"),
  R("TA025074-06", "v2500", "clamp", "/aircraft-engine-parts/rfq/other/v2500/ta025074-06/"),
  R("TA025074-05", "v2500", "clamp", "/aircraft-engine-parts/rfq/other/v2500/ta025074-05/"),
  R("TA025074-04", "v2500", "clamp", "/aircraft-engine-parts/rfq/rohr-iinc/v2500/ta025074-04/"),
  R("TA025074-03", "v2500", "clamp", "/aircraft-engine-parts/rfq/other/v2500/ta025074-03/"),
  R("TA025022-04", "v2500", "clamp", "/aircraft-engine-parts/rfq/esterline/v2500/ta025022-04/"),
  R("SW2558", "v2500", "tube", "/aircraft-engine-parts/rfq/other/v2500/sw2558/"),
  R("STEERING BAR, CFM56-", "cfm56-7", "steering bar", "/aircraft-engine-parts/rfq/other/cfm56-7/steering-bar--cfm56-7b/"),
  R("STEERING BAR, CFM56-", "cfm56-7", "steering bar", "/aircraft-engine-parts/rfq/ge/cfm56-7/steering-bar--cfm56-7b/"),
  R("ST2121-06", "v2500", "nut", "/aircraft-engine-parts/rfq/other/v2500/st2121-06/"),
  R("ST1713-10", "pw4000", "nut", "/aircraft-engine-parts/rfq/other/pw4000/st1713-10/"),
  R("ST1420-08", "pw4000", "bolt", "/aircraft-engine-parts/rfq/pratt-and-whitney/pw4000/st1420-08/"),
  R("ST1420-06", "pw4000", "bolt", "/aircraft-engine-parts/rfq/pratt-and-whitney/pw4000/st1420-06/"),
];

export default function AircraftEnginePartsPage() {
  return (
    <ToolingListing
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Aircraft Engine Parts" }]}
      h1="A Reliable Source for Aircraft Engine Parts"
      intro="Aircraft engine parts comprise high-precision structural hardware, electromechanical sensors, and fluid regulation components designed to maintain optimal engine performance under extreme pressure and thermal conditions. At AFR Enterprises, we serve as a premier single-source supplier for commercial, civil, and military aircraft engine components, offering an extensive inventory sourced from vetted global manufacturers."
      sections={[
        {
          title: "Explore Our Aircraft Engine Parts Categories",
          bullets: [
            "Hardware and Fasteners: High-grade clamps, bolts, screws, nuts, brackets, lugs, bearings, washers, and retaining rings engineered to withstand extreme engine operational environments.",
            "Engine System Electronics: Precision switches, sensors, detectors, servos, wiring, and electromechanical components designed for monitoring, controlling, and protecting engine systems.",
            "Fluid System Parts: Essential fuel pumps, tees, vanes, seals, gaskets, hoses, and blades that regulate fuel and oil flow across engine plumbing systems.",
            "Assemblies and Misc Hardware: Complete link assemblies, covers, tooling, shrouds, and structural brackets tailored for routine MRO, engine servicing, and complete overhauls.",
          ],
        },
        {
          title: "Why Source Engine Components from AFR Enterprises?",
          bullets: [
            "Quality Assured Sourcing: Fully accredited under AS9120B, ISO 9001 2015, and FAA AC 00-56B frameworks.",
            "Rapid Dispatch and AOG Support: Accelerated lead times, expedited shipping, and same-day delivery options available to mitigate critical lines-down delays.",
            "Full Traceability: Every shipment is verified against active CAGE codes, OEM specifications, and accompanied by complete Certificates of Conformance CoC.",
          ],
        },
      ]}
      col2Header="Engine Number"
      rows={ROWS}
      displaying="Displaying Page: 1 of 247"
      pageBase="/aircraft-engine-parts/page-"
      totalPages={10}
    />
  );
}
